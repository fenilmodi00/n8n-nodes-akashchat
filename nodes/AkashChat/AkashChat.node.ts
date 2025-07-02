import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class AkashChat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Akash Chat',
		name: 'akashChat',
		group: ['transform'],
		version: 1,
		description: `Interact with the AkashChat API.\n\nAkashChat provides a simple interface to leading open-source AI models powered by the Akash Supercloud.\n\n- Akash is a permissionless marketplace for cloud resources with competitive pricing.\n- The API is easy to use and supports multiple open-source models.\n- Get your API key at: https://chatapi.akash.network/\n- Docs: https://chatapi.akash.network/docs\n- Community: Akash Discord, GitHub Discussions.`,
		defaults: {
			name: 'Akash Chat',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'akashChatApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				default: '',
				placeholder: 'Ask anything... e.g. What is Akash?',
				description: 'The prompt/question to send to the selected AI model',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				options: [
					{ name: 'DeepSeek-R1', value: 'DeepSeek-R1', description: 'DeepSeek-R1 base model' },
					{ name: 'DeepSeek-R1-Distill-Llama-70B', value: 'DeepSeek-R1-Distill-Llama-70B', description: 'Distilled Llama 70B' },
					{ name: 'DeepSeek-R1-Distill-Qwen-14B', value: 'DeepSeek-R1-Distill-Qwen-14B', description: 'Distilled Qwen 14B' },
					{ name: 'DeepSeek-R1-Distill-Qwen-32B', value: 'DeepSeek-R1-Distill-Qwen-32B', description: 'Distilled Qwen 32B' },
					{ name: 'Meta-Llama-3-1-8B-Instruct-FP8', value: 'Meta-Llama-3-1-8B-Instruct-FP8', description: 'Meta Llama 3 8B Instruct' },
					{ name: 'Meta-Llama-3-2-3B-Instruct', value: 'Meta-Llama-3-2-3B-Instruct', description: 'Meta Llama 3 23B Instruct' },
					{ name: 'Meta-Llama-3-3-70B-Instruct', value: 'Meta-Llama-3-3-70B-Instruct', description: 'Meta Llama 3 70B Instruct' },
					{ name: 'Meta-Llama-4-Maverick-17B-128E-Instruct-FP8', value: 'Meta-Llama-4-Maverick-17B-128E-Instruct-FP8', description: 'Meta Llama 4 Maverick 17B' },
					{ name: 'Qwen3-235B-A22B-FP8', value: 'Qwen3-235B-A22B-FP8', description: 'Qwen3 235B A22B' },
				],
				default: 'Meta-Llama-3-1-8B-Instruct-FP8',
				description: 'Select the AI model to use for generating a response',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const prompt = this.getNodeParameter('prompt', i) as string;
				const model = this.getNodeParameter('model', i) as string;
				const credentials = await this.getCredentials('akashChatApi');

				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: 'https://chatapi.akash.network/api/v1/chat/completions',
					headers: {
						'Authorization': `Bearer ${credentials.apiKey}`,
						'Content-Type': 'application/json',
					},
					body: {
						model,
						messages: [
							{ role: 'user', content: prompt },
						],
					},
					json: true,
				});

				// Return only the model's reply for clarity, but include full response for advanced use
				returnData.push({ json: {
					model,
					prompt,
					response: response.choices?.[0]?.message?.content || response,
					fullResponse: response,
				}});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message }, pairedItem: i });
				} else {
					throw new NodeOperationError(this.getNode(), error);
				}
			}
		}
		return [returnData];
	}
}
