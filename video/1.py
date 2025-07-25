import json

def add_to_json_file(filename, name, url):
    """
    向JSON文件添加新的name-url条目
    
    参数:
        filename (str): JSON文件名
        name (str): 要添加的名称
        url (str): 要添加的URL
    """
    try:
        # 读取现有数据
        with open(filename, 'r', encoding='utf-8') as file:
            data = json.load(file)
    except FileNotFoundError:
        # 如果文件不存在，创建空列表
        data = []
    except json.JSONDecodeError:
        # 如果文件内容不是有效JSON，创建空列表
        data = []
    
    # 添加新条目
    new_entry = {"name": name, "url": url}
    data.append(new_entry)
    
    # 写回文件
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    
    print(f"成功添加: {name} - {url}")

# 示例用法
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) == 4:
        filename = sys.argv[1]
        name = sys.argv[2]
        url = sys.argv[3]
        add_to_json_file(filename, name, url)
    else:
        print("使用方法: python add_to_json.py <文件名> <名称> <URL>")
        print("示例: python add_to_json.py data.json \"示例网站\" \"https://example.com\"")
