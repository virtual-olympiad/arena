<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import { supabase } from '$lib/supabase.js';

	const signUp = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		console.log(await supabase.auth.getUser());
	};
</script>

<section class="mx-auto py-8 md:py-12 md:pb-8 xl:pb-12">
	<Card.Root class="mx-2 max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Sign In</Card.Title>
			<Card.Description>Choose an OAuth provider to sign up or log in with below.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-2">
				<button class="gsi-material-button" style="width:400" on:click={signUp}>
					<div class="gsi-material-button-state"></div>
					<div class="gsi-material-button-content-wrapper">
						<div class="gsi-material-button-icon">
							<svg
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 48 48"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								style="display: block;"
							>
								<path
									fill="#EA4335"
									d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
								></path>
								<path
									fill="#4285F4"
									d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
								></path>
								<path
									fill="#FBBC05"
									d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
								></path>
								<path
									fill="#34A853"
									d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
								></path>
								<path fill="none" d="M0 0h48v48H0z"></path>
							</svg>
						</div>
						<span class="gsi-material-button-contents">Sign in with Google</span>
						<span style="display: none;">Sign in with Google</span>
					</div>
				</button>
			</div>
			<!--
				<div class="mt-4 text-center text-sm">
					Already have an account?
					<a href="/login" class="underline">Log in</a>
				</div>
			-->
		</Card.Content>
	</Card.Root>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

	.gsi-material-button {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-appearance: none;
		appearance: none;
		background-color: WHITE;
		background-image: none;
		border: 1px solid #747775;
		-webkit-border-radius: 4px;
		border-radius: 4px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #1f1f1f;
		cursor: pointer;
		font-family: 'Roboto', arial, sans-serif;
		font-size: 14px;
		height: 40px;
		letter-spacing: 0.25px;
		outline: none;
		overflow: hidden;
		padding: 0 12px;
		position: relative;
		text-align: center;
		-webkit-transition:
			background-color 0.218s,
			border-color 0.218s,
			box-shadow 0.218s;
		transition:
			background-color 0.218s,
			border-color 0.218s,
			box-shadow 0.218s;
		vertical-align: middle;
		white-space: nowrap;
		width: auto;
		max-width: 400px;
		min-width: min-content;
	}

	.gsi-material-button .gsi-material-button-icon {
		height: 20px;
		margin-right: 12px;
		min-width: 20px;
		width: 20px;
	}

	.gsi-material-button .gsi-material-button-content-wrapper {
		-webkit-align-items: center;
		align-items: center;
		display: flex;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-flex-wrap: nowrap;
		flex-wrap: nowrap;
		height: 100%;
		justify-content: center;
		position: relative;
		width: 100%;
	}

	.gsi-material-button .gsi-material-button-contents {
		-webkit-flex-grow: 0;
		flex-grow: 0;
		font-family: 'Roboto', arial, sans-serif;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: top;
	}

	.gsi-material-button .gsi-material-button-state {
		-webkit-transition: opacity 0.218s;
		transition: opacity 0.218s;
		bottom: 0;
		left: 0;
		opacity: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.gsi-material-button:disabled {
		cursor: default;
		background-color: #ffffff61;
		border-color: #1f1f1f1f;
	}

	.gsi-material-button:disabled .gsi-material-button-contents {
		opacity: 38%;
	}

	.gsi-material-button:disabled .gsi-material-button-icon {
		opacity: 38%;
	}

	.gsi-material-button:not(:disabled):active .gsi-material-button-state,
	.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
		background-color: #303030;
		opacity: 12%;
	}

	.gsi-material-button:not(:disabled):hover {
		-webkit-box-shadow:
			0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 1px 3px 1px rgba(60, 64, 67, 0.15);
		box-shadow:
			0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 1px 3px 1px rgba(60, 64, 67, 0.15);
	}

	.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
		background-color: #303030;
		opacity: 8%;
	}
</style>
