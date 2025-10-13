#!/bin/bash
# SVG 转 PNG - 支持中文字体
# 使用 cairosvg 而不是 ImageMagick convert，因为它对字体支持更好

for file in *.svg; do
    if [ -f "$file" ]; then
        output="${file%.svg}.png"
        echo "正在转换: $file -> $output"
        cairosvg "$file" -o "$output" --dpi 300
        if [ $? -eq 0 ]; then
            echo "✓ 成功: $output"
        else
            echo "✗ 失败: $file"
        fi
    fi
done

echo ""
echo "转换完成！"
