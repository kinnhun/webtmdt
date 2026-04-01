import json
import os

paths = {
    'en-US': r'src\lib\i18n\locales\en-US.json',
    'en-GB': r'src\lib\i18n\locales\en-GB.json',
    'vi-VN': r'src\lib\i18n\locales\vi-VN.json'
}

for lang, path in paths.items():
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    if 'home' not in data: data['home'] = {}
    if 'hero' not in data['home']: data['home']['hero'] = {}
    
    if lang == 'vi-VN':
        data['home']['hero']['title1'] = 'Nhà Cung Cấp Nội Thất Ngoài Trời Uy Tín Từ Việt Nam'
        data['home']['hero']['title2'] = 'Gia Công Cho Nhà Bán Lẻ. Sản Xuất Quy Mô Lớn'
    else:
        data['home']['hero']['title1'] = 'Reliable Outdoor Furniture Supplier from Vietnam'
        data['home']['hero']['title2'] = 'Build for Retailers. Made for Scale'
        
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        print(f'Updated {path}')
