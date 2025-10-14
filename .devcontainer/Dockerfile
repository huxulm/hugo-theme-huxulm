FROM huxulm69/devimgs:hugo-debian-latest

# debian 安装 python3 环境
RUN apt-get update && apt-get install -y python3 python3-pip fonts-noto-cjk \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspaces/hugo-theme-huxulm
COPY requirements.txt .
SHELL ["/bin/bash", "-c"]
RUN python3 -m venv /opt/venv && source /opt/venv/bin/activate && pip install -r requirements.txt

CMD ["/bin/bash", "-c", "source /opt/venv/bin/activate"]