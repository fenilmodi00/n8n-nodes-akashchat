![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-node-akashchat

This is an n8n community node. It lets you use AkashChat in your n8n workflows.

AkashChat is an API that provides access to leading open-source AI models powered by the Akash Supercloud. Akash is a permissionless marketplace for cloud resources with competitive pricing compared to traditional cloud providers.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Send a prompt to an AkashChat model and receive a completion (chat response)
- Select from multiple open-source models (Llama, Qwen, DeepSeek, etc.)

## Credentials

You need an AkashChat API key. Sign up and get your key at [https://chatapi.akash.network/](https://chatapi.akash.network/).

1. Go to the AkashChat portal and log in or register.
2. Copy your API key from your account dashboard.
3. In n8n, add new credentials for "Akash Chat API" and paste your API key.

## Compatibility

- Requires n8n v1.0.0 or later
- Tested with n8n v1.0.0 and above

## Usage

1. Add the AkashChat node to your workflow.
2. Enter your prompt and select a model.
3. Connect your Akash Chat API credentials.
4. Run the workflow to get a response from the selected model.

**Example curl request:**
```bash
curl https://chatapi.akash.network/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-xxxxxxxx" \
  -d '{
    "model": "Meta-Llama-3-1-8B-Instruct-FP8",
    "messages": [
      { "role": "user", "content": "Who are you?" }
    ]
  }'
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [AkashChat API documentation](https://chatapi.akash.network/docs)
* [Akash Discord](https://discord.com/invite/akash)
* [GitHub Discussions](https://github.com/akash-network/akash-chat/discussions)

## Version history

- 0.1.0: Initial release with chat/completions support and model selection.
