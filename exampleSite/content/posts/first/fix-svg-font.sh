#!/bin/bash
# 修复 SVG 字体，添加中文字体支持
for file in *.svg; do
    if [ -f "$file" ]; then
        sed -i 's#font-family="[^"]*"#font-family="Noto Sans CJK SC"#g' "$file"
        echo "已修复: $file"
    fi
done
