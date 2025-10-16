from http import HTTPStatus
from urllib.parse import urlparse, unquote
from pathlib import PurePosixPath
import requests
from dashscope import ImageSynthesis
import os
import dashscope
import dotenv

dotenv.load_dotenv()

# 以下为北京地域url，若使用新加坡地域的模型，需将url替换为：https://dashscope-intl.aliyuncs.com/api/v1
dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'

# 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx"
# 新加坡和北京地域的API Key不同。获取API Key：https://help.aliyun.com/zh/model-studio/get-api-key
api_key = os.getenv("DASHSCOPE_API_KEY")

def gen(prompt, output=None):

    print('----同步调用，请等待任务执行----')
    rsp = ImageSynthesis.call(api_key=api_key,
                            # model="qwen-image-plus",
                            model='wan2.5-t2i-preview',
                            prompt=prompt,
                            n=1,
                            size='1664*928',
                            prompt_extend=True,
                            watermark=False)
    print('response: %s' % rsp)
    if rsp.status_code == HTTPStatus.OK:
        # 在当前目录下保存图片
        for result in rsp.output.results:
            file_name = output or PurePosixPath(unquote(urlparse(result.url).path)).parts[-1]
            with open(file_name, 'wb+') as f:
                f.write(requests.get(result.url).content)
    else:
        print('同步调用失败, status_code: %s, code: %s, message: %s' %
            (rsp.status_code, rsp.code, rsp.message))
        
if __name__ == "__main__":
    if not api_key:
        print("请先配置环境变量DASHSCOPE_API_KEY，获取API Key：https://help.aliyun.com/zh/model-studio/get-api-key")
    else:
        # 从命令行参数读取 --output参数，指定输出文件名
        now_time_str = os.popen('date +%Y%m%d_%H%M%S').read().strip()
        output = f"./scripts/public/banner_%s.png" % now_time_str
        print("默认输出文件名：", output)
        prompt = input("请输入生成图片的描述性文字（prompt）：")

    # gen(f"生成一张博客文章封面，简约风格，图片不要出现文字标题，主要内容：{prompt}", output=output)
    gen(f"生成一张博客文章封面，图片不要出现文字标题，主要内容：{prompt}", output=output)
