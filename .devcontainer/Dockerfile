# Use the official Node.js image as base
FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

# Install additional system dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    wget \
    vim \
    build-essential \
    python3 \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install Terraform 1.9.5
RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | tee /usr/share/keyrings/hashicorp-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list \
    && apt-get update && apt-get install -y terraform \
    && terraform version \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g npm@latest

# Set working directory
WORKDIR /workspace

# Expose ports
EXPOSE 3001 3000 5173
