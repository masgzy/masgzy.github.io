#!/usr/bin/env python3
"""
video_entry.py - 高效视频记录管理工具

支持模式：
1. 单条交互模式（默认）
2. 批量交互模式 (-m)
3. API交互模式 (-a)
4. API批量模式 (-a1)
5. 文件批量模式 (-f FILE)
6. API文件模式 (-af FILE)
"""

import json
import os
import sys
import argparse
import re
from typing import List, Dict, Tuple, Optional

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
    print('进入批量模式，支持格式：')
    print('1. name => url')
    print('2. url => filename')
    print('（留空结束输入）\n')
    
    entries = []
    while True:
        line = input('输入条目：').strip()
        if not line:
            break
        
        # 尝试解析两种格式
        if '=>' in line:
            left, right = parse_line(line)
            if left and right:
                # 判断是 name => url 还是 url => name
                if left.startswith(('http://', 'https://')):
                    entries.append({"name": right, "url": left})
                else:
                    entries.append({"name": left, "url": right})
                print(f'✅ 已缓存：{len(entries)} 条')
            else:
                print('❌ 格式错误，请使用 => 分隔')
        else:
            print('❌ 必须使用 => 分隔两个字段')
    
    if entries:
        data.extend(entries)
        save(data)
        print(f'批量添加完成，共添加 {len(entries)} 条记录')

def parse_line(line: str) -> Tuple[Optional[str], Optional[str]]:
    """解析单行数据，支持多种格式"""
    line = line.strip().rstrip(',')
    
    # 支持格式：
    # url => filename
    # "url" => "filename"
    # 'url' => 'filename'
    # filename => url
    pattern = re.compile(r'^\s*(["\']?)(.*?)\1\s*=>\s*(["\']?)(.*?)\3\s*$')
    if match := pattern.match(line):
        _, left, _, right = match.groups()
        return left.strip(), right.strip()
    return None, None

def process_file(input_file: str, is_api: bool = False, prefix: str = '') -> List[ENTRY_TYPE]:
    """处理输入文件"""
    if not os.path.isfile(input_file):
        sys.exit(f'❌ 文件不存在: {input_file}')
    
    entries = []
    with open(input_file, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            
            if is_api:
                # API模式：id => name
                if '=>' not in line:
                    print(f'⚠ 第 {line_num} 行格式错误，跳过')
                    continue
                
                vid, name = parse_line(line)
                if vid and name:
                    entries.append({
                        "name": name,
                        "url": f'{prefix}{vid}'
                    })
            else:
                # 普通批量模式：支持两种格式
                if '=>' in line:
                    left, right = parse_line(line)
                    if left and right:
                        if left.startswith(('http://', 'https://')):
                            entries.append({"name": right, "url": left})
                        else:
                            entries.append({"name": left, "url": right})
                    else:
                        print(f'⚠ 第 {line_num} 行格式错误，跳过')
    
    return entries

def api_add(prefix: str = '', input_file: str = '') -> None:
    """API交互模式"""
    if not prefix:
        prefix = validate_input('请输入 API 前缀（如 https://example.com/api/video）：').rstrip('/')
    
    data = load_or_create()
    
    if input_file:
        # 文件模式
        entries = process_file(input_file, is_api=True, prefix=prefix)
        if not entries:
            print('❌ 文件中没有有效数据')
            return
    else:
        # 交互模式
        print('已进入 API 模式，输入格式：id => name')
        print('（留空结束输入）\n')
        entries = []
        while True:
            line = input('输入条目：').strip()
            if not line:
                break
            
            vid, name = parse_line(line)
            if vid and name:
                entries.append({
                    "name": name,
                    "url": f'{prefix}{vid}'
                })
                print(f'✅ 已缓存：{len(entries)} 条')
            else:
                print('❌ 格式错误，请使用 id => name 格式')
    
    if entries:
        data.extend(entries)
        save(data)
        print(f'添加完成，共添加 {len(entries)} 条记录')

def batch_add(input_file: str = '') -> None:
    """批量添加模式"""
    data = load_or_create()
    
    if input_file:
        # 文件模式
        entries = process_file(input_file)
        if not entries:
            print('❌ 文件中没有有效数据')
            return
    else:
        # 交互模式
        entries = []
        print('进入批量模式，支持格式：')
        print('1. name => url')
        print('2. url => filename')
        print('（留空结束输入）\n')
        
        while True:
            line = input('输入条目：').strip()
            if not line:
                break
            
            left, right = parse_line(line)
            if left and right:
                if left.startswith(('http://', 'https://')):
                    entries.append({"name": right, "url": left})
                else:
                    entries.append({"name": left, "url": right})
                print(f'✅ 已缓存：{len(entries)} 条')
            else:
                print('❌ 格式错误，请使用 => 分隔两个字段')
    
    if entries:
        data.extend(entries)
        save(data)
        print(f'批量添加完成，共添加 {len(entries)} 条记录')

def main():
    parser = argparse.ArgumentParser(
        description='高效视频记录管理工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""示例:
  单条添加: python video_entry.py
  批量交互: python video_entry.py -m
  API交互: python video_entry.py -a
  文件批量: python video_entry.py -f input.txt
  API文件: python video_entry.py -af input.txt""")
    
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-m', '--multi', action='store_true', help='批量交互模式')
    group.add_argument('-a', '--api', action='store_true', help='API交互模式')
    group.add_argument('-f', '--file', metavar='FILE', help='从文件批量导入')
    group.add_argument('-af', '--api-file', metavar='FILE', help='从文件API批量导入')
    
    args = parser.parse_args()

    try:
        if args.api_file:
            api_add(input_file=args.api_file)
        elif args.file:
            batch_add(input_file=args.file)
        elif args.multi:
            batch_add()
        elif args.api:
            api_add()
        else:
            single_add()
    except KeyboardInterrupt:
        print("\n🚫 操作已取消")
    except Exception as e:
        print(f"❌ 发生错误: {str(e)}", file=sys.stderr)

if __name__ == '__main__':
    main()
