import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * Akash Chat API Credentials
 *
 * The AkashChat API provides a simple interface to access leading open-source AI models powered by the Akash Supercloud.
 *
 * - Akash is a permissionless marketplace for cloud resources with competitive pricing compared to traditional cloud providers.
 * - The API is compatible with the OpenAI API standard.
 * - Get your API key at: https://chatapi.akash.network/
 * - Documentation: https://chatapi.akash.network/docs
 * - Community: [Akash Discord](https://discord.com/invite/akash) | [GitHub Discussions](https://github.com/akash-network/akash-chat/discussions)
 */
export class AkashChatApi implements ICredentialType {
	name = 'akashChatApi';
	displayName = 'Akash Chat API';
	documentationUrl = 'https://chatapi.akash.network/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			description: 'Your Akash Chat API Key. Get it from https://chatapi.akash.network/',
			typeOptions: {
				password: true,
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: 'Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
