#!/usr/bin/env python3
"""
add_entry.py - 高效批量添加视频记录工具
"""
import json
import os
import sys
import argparse
import re
from typing import List, Dict

FILE = 'video.json'
ENTRY_TYPE = Dict[str, str]

def load_or_create() -> List[ENTRY_TYPE]:
    """加载或创建JSON文件"""
    if not os.path.isfile(FILE):
        return []
    try:
        with open(FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        sys.exit(f'❌ 无法读取 {FILE}: {str(e)}')

def save(data: List[ENTRY_TYPE]) -> None:
    """保存数据到文件"""
    try:
        with open(FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except IOError as e:
        sys.exit(f'❌ 无法写入 {FILE}: {str(e)}')

def validate_input(prompt: str, required: bool = True) -> str:
    """验证用户输入"""
    while True:
        value = input(prompt).strip()
        if not value and required:
            print("❌ 此项为必填项，请重新输入")
            continue
        return value

def single_add() -> None:
    """单条添加模式"""
    data = load_or_create()
    name = validate_input('请输入 name：')
    url = validate_input('请输入 url：')
    data.append({"name": name, "url": url})
    save(data)
    print(f'✅ 已添加：{name}')

def multi_add() -> None:
    """批量交互模式"""
    data = load_or_create()
    print('进入批量模式，连续输入 name 与 url，留空 name 结束。\n')
    
    entries = []
    while True:
        name = input('name (留空结束)：').strip()
        if not name:
            break
        url = input('url：').strip()
        if not url:
            print('❌ url 不能为空，本条跳过\n')
            continue
        entries.append({"name": name, "url": url})
        print(f'✅ 已缓存：{name} (共 {len(entries)} 条)\n')
    
    if entries:
        data.extend(entries)
        save(data)
        print(f'批量添加完成，共添加 {len(entries)} 条记录')

def api_add() -> None:
    """API交互模式"""
    prefix = validate_input('请输入 API 前缀（如 https://example.com/api/video）：').rstrip('/')
    data = load_or_create()
    
    print('已进入 API 模式，只需输入 name 与 ID，留空 name 结束。\n')
    entries = []
    while True:
        name = input('name (留空结束)：').strip()
        if not name:
            break
        vid = validate_input('ID：')
        # 直接拼接，不添加斜杠
        url = f'{prefix}{vid}'
        entries.append({"name": name, "url": url})
        print(f'✅ 已缓存：{name} => {url} (共 {len(entries)} 条)\n')
    
    if entries:
        data.extend(entries)
        save(data)
        print(f'API 模式添加完成，共添加 {len(entries)} 条记录')

def parse_line(line: str) -> tuple:
    """高效解析单行数据"""
    line = line.strip().rstrip(',')
    
    # 预编译正则表达式
    quoted_pattern = re.compile(r'^\s*(["\']?)(.*?)\1\s*=>\s*(["\']?)(.*?)\3\s*$')
    simple_pattern = re.compile(r'^\s*([^\s=]+)\s*=>\s*(.+?)\s*$')
    
    if match := quoted_pattern.match(line):
        _, vid, _, name = match.groups()
    elif match := simple_pattern.match(line):
        vid, name = match.groups()
    else:
        return None
    
    return vid.strip(), name.strip()

def api_batch_add() -> None:
    """高效API批量模式"""
    prefix = validate_input('请输入 API 前缀（如 https://example.com/api/video）：').rstrip('/')
    
    print('\n请输入多行 id => name 格式数据（空行结束）：')
    print('支持格式示例：')
    print('123 => 视频1')
    print('456 => 视频2,')
    print('"789" => "视频3"')
    print("'101' => '视频4'")
    print('（直接回车结束输入）\n')
    
    data = load_or_create()
    entries = []
    line_count = 0
    success_count = 0
    
    while True:
        try:
            line = input()
            line_count += 1
            if not line.strip():
                break
            
            if result := parse_line(line):
                vid, name = result
                # 直接拼接，不添加斜杠
                entries.append({
                    "name": name,
                    "url": f'{prefix}{vid}'
                })
                success_count += 1
                print(f'✓ 第 {line_count} 行解析成功', end='\r')
            else:
                print(f'⚠ 第 {line_count} 行格式错误: {line[:20]}...')
                
        except KeyboardInterrupt:
            print("\n⚠ 用户中断输入")
            break
    
    if entries:
        data.extend(entries)
        save(data)
        print(f'\n✅ 成功添加 {success_count}/{line_count} 条记录')
        if success_count < line_count:
            print(f'⚠ 有 {line_count - success_count} 条记录未添加')
    else:
        print('❌ 未添加任何数据')

def main():
    parser = argparse.ArgumentParser(
        description='高效视频记录添加工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""示例:
  单条添加: python add_entry.py
  批量交互: python add_entry.py -m
  API模式: python add_entry.py -a
  高效批量: python add_entry.py -a1""")
    
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-m', '--multiple', action='store_true', help='批量交互模式')
    group.add_argument('-a', '--api', action='store_true', help='API交互模式')
    group.add_argument('-a1', '--api-batch', action='store_true', help='高效API批量模式')
    
    args = parser.parse_args()

    try:
        if args.multiple:
            multi_add()
        elif args.api:
            api_add()
        elif args.api_batch:
            api_batch_add()
        else:
            single_add()
    except KeyboardInterrupt:
        print("\n🚫 操作已取消")
    except Exception as e:
        print(f"❌ 发生错误: {str(e)}", file=sys.stderr)

if __name__ == '__main__':
    main()
