<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation, EffectCoverflow } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/effect-coverflow';
	import 'swiper/css/navigation';

	let swiper: Swiper;
	let currentPage = $state(0);

	const pages = [
		{ src: '/images/coverimage.png', caption: 'Cover' },
		{ src: '/images/scen001.png', caption: 'Scene 1' },
		{ src: '/images/scen002.png', caption: 'Scene 2' },
		{ src: '/images/scen003.png', caption: 'Scene 3' },
		{ src: '/images/scen004.png', caption: 'Scene 4' },
		{ src: '/images/scen005.png', caption: 'Scene 5' },
		{ src: '/images/scen006.png', caption: 'Scene 6' },
		{ src: '/images/scen007.png', caption: 'Scene 7' }
	];

	function goToPage(index: number) {
		if (swiper) {
			swiper.slideTo(index);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!swiper) return;

		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			swiper.slideNext();
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			swiper.slidePrev();
		} else if (event.key === 'Home') {
			swiper.slideTo(0);
		} else if (event.key === 'End') {
			swiper.slideTo(pages.length - 1);
		}
	}

	onMount(() => {
		swiper = new Swiper('.swiper', {
			modules: [Navigation, EffectCoverflow],
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 1,
			speed: 1000, // Correct parameter name is 'speed', not 'duration', increased to 2 seconds
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 200, // Increased depth for more pronounced effect
				modifier: 1,
				slideShadows: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				slideChange: () => {
					currentPage = swiper.activeIndex;
				}
			}
		});
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="stars-container">
	<div class="stars"></div>
	<div class="stars2"></div>
	<div class="stars3"></div>
</div>

<main class="relative z-10 flex h-screen w-full flex-col items-center justify-center p-4">
	<div
		class="flex w-full max-w-7xl flex-col items-center rounded-2xl bg-gray-700/40 p-4 shadow-xl transition-all duration-300 md:p-8"
	>
		<div class="swiper mb-8 h-[70vh] w-full">
			<div class="swiper-wrapper">
				{#each pages as page, i}
					<div class="swiper-slide flex items-center justify-center">
						<img
							src={page.src}
							alt={page.caption}
							class="max-h-[70vh] max-w-full rounded-lg object-contain"
						/>
					</div>
				{/each}
			</div>

			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>

		<div
			class="mt-4 flex w-full max-w-3xl items-center justify-between rounded-full bg-gray-500 p-2"
		>
			<div class="mx-auto flex gap-2 p-2">
				{#each pages as page, i}
					<button
						class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-gray-500 bg-black font-semibold text-gray-100 transition-all duration-200 hover:scale-105 hover:bg-blue-800 {currentPage ===
						i
							? 'scale-110 border-blue-600 bg-blue-900 text-white shadow-md'
							: ''}"
						onclick={() => goToPage(i)}
					>
						{i === 0 ? 'C' : i}
					</button>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: #000;
		color: #333;
		overflow: hidden; /* Prevent scrollbars from star animation */
	}

	.stars-container {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		overflow: hidden;
	}

	.stars,
	.stars2,
	.stars3 {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: block;
		background-image:
			radial-gradient(2px 2px at 20px 30px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 160px 120px, #fff, rgba(0, 0, 0, 0));
		background-repeat: repeat;
		background-size: 200px 200px;
		animation: stars-animation 30s ease-in-out infinite;
		transform-origin: 0 0;
	}

	.stars2 {
		background-image:
			radial-gradient(3px 3px at 50px 160px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(3px 3px at 180px 120px, #fff, rgba(0, 0, 0, 0));
		background-size: 300px 300px;
		animation: stars-animation 90s linear infinite;
	}

	.stars3 {
		background-image:
			radial-gradient(1px 1px at 10px 10px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 150px 150px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 60px 170px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 200px 100px, #fff, rgba(0, 0, 0, 0));
		background-size: 250px 250px;
		animation: stars-animation 60s linear infinite;
	}

	@keyframes stars-animation {
		0% {
			opacity: 0.5;
			transform: translateY(0);
		}
		50% {
			opacity: 1;
			transform: translateY(-25px);
		}
		100% {
			opacity: 0.5;
			transform: translateY(0);
		}
	}

	/* Swiper customization */
	:global(.swiper-button-next),
	:global(.swiper-button-prev) {
		color: white;
	}
</style>
