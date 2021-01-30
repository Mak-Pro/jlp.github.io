if(window.innerWidth < 768) {

	if(document.querySelector('.intro') !== null) {
		document.querySelector('.intro').remove();
	}
	
}




gsap.registerPlugin(ScrollTrigger, SplitText);



(function( $ ) {

	let str = 'https://www.youtube.com/watch?feature=youtu.be&v=WWnUlPXHo-s&app=desktop',
			part = str.substring(str.indexOf("v") + 2 ),
			finalID = part.substring(0, part.indexOf("&")),
			embedUrl = `https://www.youtube.com/embed/${finalID}`;


	function tabs(parent, tab, tabpanel) {
		$(parent).find($(tab)).click(function() {
			if($(this).hasClass('active')) {
				return false;
			}
			$(parent).find($(tab)).removeClass("active").eq($(this).index()).addClass("active");
			$(parent).find($(tabpanel)).removeClass("active").eq($(this).index()).addClass("active");
		}).eq(0).addClass("active");
	}













	/* ---------- intro function for controls ---------- */

	function getNestedLabelTime(timeline, label) {
		let children = timeline.getChildren(true, false, true),
		i = children.length,
		tl, time;
		while (i--) {
			if (label in children[i].labels) {
				tl = children[i];
				time = tl.labels[label];
				break;
			}
		}
		if (tl) {
			while (tl !== timeline) {
				time = tl.startTime() + time / tl.timeScale();
				tl = tl.parent;
			}
		}
		return time;
	}




	/* ---------- INTRO ---------- */

	if(document.querySelector('.intro') !== null) {

		const introTL = gsap.timeline();

		document.querySelectorAll('.intro .split').forEach(el => {
			let splitText = new SplitText(el, {type: 'lines, words, chars', linesClass: 'line', wordsClass: 'word', charsClass: 'char'});
		});


		/* ---------- scenes ---------- */

		introTL
			.set('body', {autoAlpha: 1})


			.add('scene-1') // scene 1
			.set('.scene-1', {visibility: 'visible', delay: 0.5})
			.from('.intro .logo', {opacity: 0, duration: 2, ease: 'expo.inOut'})
			.from('.intro__progress_controls .control', {autoAlpha: 0, stagger: 0.05, ease: 'expo.out'}, '-=0.5')
			.from('.intro__skip', {opacity: 0, duration: 2, ease: 'expo.out'})
			.from('.scene-1 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.scene-1 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=2.5')
			.to('.scene-1 .word .char', {delay: 1.5, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.scene-1, .scene-1 .word .char', {clearProps: 'transform,opacity,visibility'});
			}})



			.add('scene-2') // scene 2
			.set('.scene-2', {visibility: 'visible', delay: 0.5})
			.from('.scene-2 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.scene-2 .word .char', {clearProps: 'transform,opacity'});
			}})
			.to('.scene-2 .word .char', {delay: 3, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.scene-2, .scene-1 .word .char', {clearProps: 'transform,opacity,visibility'});
			}})



			.add('scene-3') // scene 3
			.set('.scene-3', {visibility: 'visible', delay: 0.5})
			.to('.intro__overlay', {autoAlpha: 1, duration: 3, ease: "power1.inOut"})
			.from('.scene-3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.033, onComplete: () => {
				gsap.set('.scene-3 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.to('.scene-3 .word .char', {delay: 1.5, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.scene-3, .scene-3 .word .char', {clearProps: 'transform,opacity,visibility'});
			}})



			.add('scene-4') // scene 4
			.set('.scene-4', {visibility: 'visible', delay: 0.5})
			.to('.intro__progress_controls .control span', {backgroundColor: '#FFFFFF', duration: 1, ease: 'expo.out', onComplete: () => {
				document.querySelector('.intro__skip').classList.add('light');
			}})
			.from('.scene-4 h4 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.scene-4 h4 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.from('.scene-4 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.scene-4 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.set('.intro__preview', {scale: 0.61, visibility: 'visible'}, 'scene-4')
			.fromTo('.intro__preview', {y: '100vh'}, {duration: 2, y: '62vh', ease: 'expo.out'}, 'scene-4+=1')
			.to('.intro', {duration: 4, opacity: 1})



			.add('scene-5') // scene 5
			.to('.scene-4 h4 .word .char', {y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.003, onComplete: () => {
				gsap.set('.scene-4 h4 .word .char', {clearProps: 'transform,opacity'});
			}})
			.to('.scene-4 h3 .word .char', {y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.scene-4, .scene-4 h3 .word .char', {clearProps: 'transform,opacity,visibility'});
			}},'<')
			.to('.intro .logo', {y: '-100%', opacity: 0, duration: 2, ease: 'expo.inOut'}, '<')
			.to('.intro__preview', {scale: 1, y: '-2.96vw', duration: 2, ease: 'expo.in'}, '-=1.2')
			.to('.intro__preview_frame', {opacity: 0, duration: 1, ease: 'expo.in'}, '-=1.2')
			.to('.intro__preview_site_overlay.first', {opacity: 0, duration: 2, ease: 'power1.out'}, '-=1.2')
			.to('.intro__preview_site', {y: '-19%', duration: 2, ease: 'expo.inOut'}, '-=1')
			.to('.intro__preview_site .static', {filter: "blur(5px)", duration: 0.5, ease: 'power1.out'})
			.to('.intro__preview_site_overlay.second', {opacity: 1, duration: 1, ease: 'power1.out'}, '<')
			.to('.intro__preview_site .dynamic', {duration: 0, clipPath:"inset(33.36% 72.15% 58.53% 13.3% round 15px)"}, '<')
			.set('.intro__preview_notes .box-1', {visibility: 'visible'})
			.from('.intro__preview_notes .box-1 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-1 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__preview_notes .box-1 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-1 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__preview_notes .box-1 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__preview_notes .box-1 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro', {duration: 4, opacity: 1})
			.to('.intro__preview_notes .box-1', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__preview_notes .box-1', {clearProps: 'all'});
			}})


			.add('scene-6') // scene 6
			.to('.intro__preview_site', {y: '0%', duration: 2, ease: 'expo.inOut'})
			.set('.intro__preview_site .dynamic', {clearProps: 'all'})
			.fromTo('.intro__preview_site .dynamic', {clipPath:"circle(0% at 84.6% 2.65%)"}, {clipPath:"circle(3.6% at 84.6% 2.65%)", duration: 1, ease: 'expo.inOut'})
			.set('.intro__preview_notes .box-2', {visibility: 'visible'})
			.from('.intro__preview_notes .box-2 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-2 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__preview_notes .box-2 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-2 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__preview_notes .box-2 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__preview_notes .box-2 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro', {duration: 4, opacity: 1})
			.to('.intro__preview_notes .box-2', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__preview_notes .box-2', {clearProps: 'all'});
			}})



			.add('scene-7') // scene 7
			.to('.intro__preview_site .dynamic', {clipPath:"circle(2% at 21.1% 2.65%)", duration: 2, ease: 'expo.inOut'})
			.set('.intro__preview_notes .box-3', {visibility: 'visible'})
			.from('.intro__preview_notes .box-3 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-3 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__preview_notes .box-3 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-3 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__preview_notes .box-3 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__preview_notes .box-3 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro', {duration: 4, opacity: 1})
			.to('.intro__preview_notes .box-3', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__preview_notes .box-3', {clearProps: 'all'});
			}})
			.to('.intro__preview_site .dynamic', {clipPath:"circle(0% at 21.1% 2.65%)", duration: 1, ease: 'expo.in'}, '<')



			.add('scene-8') // scene 8
			.set('.intro__preview_site .segment', {visibility: 'visible'})
			.from('.intro__preview_site .segment.text', {opacity: 0, duration: 2, ease: 'expo.in'})
			.from('.intro__preview_site .segment.step', {opacity: 0, stagger: {amount: 1}, ease: 'expo.in'}, '-=0.5')
			.set('.intro__preview_notes .box-4', {visibility: 'visible'})
			.from('.intro__preview_notes .box-4 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-4 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__preview_notes .box-4 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__preview_notes .box-4 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__preview_notes .box-4 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__preview_notes .box-4 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro', {duration: 4, opacity: 1})
			.to('.intro__preview_notes .box-4', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__preview_notes .box-4', {clearProps: 'all'});
			}})
			.to('.intro__preview_site .segment.text', {opacity: 0, duration: 2, ease: 'expo.out', onComplete: () => {
				gsap.set('.intro__preview_site .segment.text', {clearProps: 'all'});
			}}, '-=1')
			.to('.intro__preview_site .segment.step', {opacity: 0, stagger: {amount: 0.5}, ease: 'expo.in'}, '-=1.5')
			.to('.intro__preview', {opacity: 0, duration: 2, ease: 'expo.out',}, '-=0.5')



			.add('scene-9') // scene 9
			.set('.scene-5', {visibility: 'visible'})
			.set('.intro .logo', {y: 0}, '<')
			.to('.intro__progress_controls .control span', {backgroundColor: '#222222', duration: 1, ease: 'expo.out', onComplete: () => {
				document.querySelector('.intro__skip').classList.remove('light');
			}}, '<')
			.to('.intro .logo', {opacity: 1, duration: 2, ease: 'expo.inOut'}, '-=1.5')
			.from('.scene-5 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.scene-5 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.to('.scene-5 .word .char', {delay: 3, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01})
			.set('.scene__testimonials', {visibility: 'visible'})
			.from('.scene__testimonial:nth-child(1)', {opacity: 0, duration: 1, ease: "power1.inOut"})
			.from('.scene__testimonial:nth-child(2)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.from('.scene__testimonial:nth-child(3)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.to('.intro', {duration: 6, opacity: 1})
			.to('.scene__testimonial:nth-child(1)', {opacity: 0, duration: 1, ease: "power1.inOut"})
			.to('.scene__testimonial:nth-child(2)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.to('.scene__testimonial:nth-child(3)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.from('.scene__testimonial:nth-child(4)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=1.25')
			.from('.scene__testimonial:nth-child(5)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.from('.scene__testimonial:nth-child(6)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.to('.intro', {duration: 6, opacity: 1})
			.to([
				'.scene__testimonial:nth-child(4)', 
				'.scene__testimonial:nth-child(5)', 
				'.scene__testimonial:nth-child(6)'], {opacity: 0, stagger: 0.25, ease: "power1.inOut"})



			.add('final-scene') // final scene
			.to('.intro__overlay', {autoAlpha: 0, duration: 0.5, ease: 'none'}, '-=1.5')
			.to('.intro__progress_controls .control', {autoAlpha: 0, stagger: 0.05, ease: 'expo.out'})
			.to('.intro__skip', {autoAlpha: 0, duration: 1, ease: 'expo.out'}, '<')
			.set('.scene-6', {visibility: 'visible', zIndex: 10}, '-=1')
			.to('.scene-6 .scene__overlay', {duration: 2, autoAlpha: 1, ease: 'expo.out' }, '<')
			.from('.scene-6 h2 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.scene-6 h2 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=1')
			.from('.scene-6 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.scene-6 h2 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.from('.scene-6 .buttons', {opacity: 0, duration: 2, ease: 'expo.inOut'}, '-=1.5')
			.from('.scene-6 .action', {opacity: 0, duration: 2, ease: 'expo.inOut', onComplete: () => {
				let st = 0;
				document.addEventListener("wheel", function(){ 
				   st++;
				   if(st > 0 && st < 2) {
				   		gsap.to('.intro', {y: '-100%', autoAlpha: 0, duration: 2, ease: 'expo.inOut', onComplete: () => {
				   			gsap.set('.intro', {display: 'none'});
				   			gsap.set('html, body', {height: 'auto', overflow: 'auto'});
				   		}});
				   		gsap.from('#main', {y: '100vh', opacity: 0, duration: 2, ease: 'expo.inOut'});
				   		
				   }
				});
			}}, '-=1.3')
			.add('end');


			const labels = Object.values(introTL.seek(getNestedLabelTime(introTL, null)).labels);

			introTL
				.to(document.querySelectorAll('.intro__progress_controls .control')[0].querySelector('span'), {width: '102%', duration: labels[1] - labels[0], ease: "power1.inOut"}, 'scene-1')
				.to(document.querySelectorAll('.intro__progress_controls .control')[1].querySelector('span'), {width: '102%', duration: labels[2] - labels[1], ease: "power1.inOut"}, 'scene-2')
				.to(document.querySelectorAll('.intro__progress_controls .control')[2].querySelector('span'), {width: '102%', duration: labels[3] - labels[2], ease: "power1.inOut"}, 'scene-3')
				.to(document.querySelectorAll('.intro__progress_controls .control')[3].querySelector('span'), {width: '102%', duration: labels[4] - labels[3], ease: "power1.inOut"}, 'scene-4')
				.to(document.querySelectorAll('.intro__progress_controls .control')[4].querySelector('span'), {width: '102%', duration: labels[5] - labels[4], ease: "power1.inOut"}, 'scene-5')
				.to(document.querySelectorAll('.intro__progress_controls .control')[5].querySelector('span'), {width: '102%', duration: labels[6] - labels[5], ease: "power1.inOut"}, 'scene-6')
				.to(document.querySelectorAll('.intro__progress_controls .control')[6].querySelector('span'), {width: '102%', duration: labels[7] - labels[6], ease: "power1.inOut"}, 'scene-7')
				.to(document.querySelectorAll('.intro__progress_controls .control')[7].querySelector('span'), {width: '102%', duration: labels[8] - labels[7], ease: "power1.inOut"}, 'scene-8')
				.to(document.querySelectorAll('.intro__progress_controls .control')[8].querySelector('span'), {width: '102%', duration: labels[9] - labels[8], ease: "power1.inOut"}, 'scene-9');
		


		/* ---------- controls ---------- */
		document.querySelectorAll('.intro__progress_controls .control').forEach((control, i) => {
			control.addEventListener('click', () => {
				introTL.play(`scene-${i + 1}`);
				if((i + 1) > 3 && (i + 1) < 9) {
					document.querySelector('.intro__skip').classList.add('light');
				}
				else {
					document.querySelector('.intro__skip').classList.remove('light');
				}
			});
		});


		document.querySelector('.intro__skip').addEventListener('click', (e) => {
			introTL.play('final-scene');
			e.target.classList.add('hidden');
		});


		GSDevTools.create({
			container: '.intro',
			animation: introTL
		});

		introTL.restart();


	}



















	/* ---------- INTRO MOBILE ---------- */

	if(document.querySelector('.intro__mobile') !== null) {

		const introMobileTL = gsap.timeline();

		document.querySelectorAll('.intro__mobile .split').forEach(el => {
			let mobileSplitText = new SplitText(el, {type: 'lines, words, chars', linesClass: 'line', wordsClass: 'word', charsClass: 'char'});
		});


		introMobileTL
			.set('body', {autoAlpha: 1})


			.add('scene-1') // scene 1
			.set('.intro__mobile .scene-1', {visibility: 'visible', delay: 0.5})
			.from('.intro__mobile .logo', {opacity: 0, duration: 2, ease: 'expo.inOut'})
			.from('.intro__mobile .intro__progress_controls .control', {autoAlpha: 0, stagger: 0.05, ease: 'expo.out'}, '-=0.5')
			.from('.intro__mobile_skip', {opacity: 0, duration: 2, ease: 'expo.out'})
			.from('.intro__mobile .scene-1 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.intro__mobile .scene-1 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=2.5')
			.to('.intro__mobile .scene-1 .word .char', {delay: 1.5, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.intro__mobile .scene-1, .intro__mobile .scene-1 .word .char', {clearProps: 'transform,opacity,visibility'});
			}})



			.add('scene-2') // scene 2
			.set('.intro__mobile .scene-2', {visibility: 'visible', delay: 0.5})
			.from('.intro__mobile .scene-2 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.intro__mobile .scene-2 .word .char', {clearProps: 'transform,opacity'});
			}})
			.to('.intro__mobile .scene-2 .word .char', {delay: 3, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.intro__mobile .scene-2, .intro__mobile .scene-1 .word .char', {clearProps: 'transform,opacity,visibility'});
			}})



			.add('scene-3') // scene 3
			.set('.intro__mobile .scene-3', {visibility: 'visible', delay: 0.5})
			.to('.intro__mobile_overlay', {autoAlpha: 1, duration: 3, ease: "power1.inOut"})
			.from('.intro__mobile .scene-3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.033, onComplete: () => {
				gsap.set('.intro__mobile .scene-3 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.to('.intro__mobile .scene-3 .word .char', {delay: 1.5, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.intro__mobile .scene-3, .intro__mobile .scene-3 .word .char', {clearProps: 'transform,opacity,visibility'});
			}})



			.add('scene-4') // scene 4
			.set('.intro__mobile .scene-4', {visibility: 'visible', delay: 0.5})
			.from('.intro__mobile .scene-4 h4 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .scene-4 h4 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.from('.intro__mobile .scene-4 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.intro__mobile .scene-4 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.set('.intro__mobile_preview_wrapper', {scale: 0.52, visibility: 'visible'}, 'scene-4')
			.fromTo('.intro__mobile_preview_wrapper', {y: '100vh'}, {duration: 2, y: '36vh', ease: 'expo.out'}, 'scene-4+=1')
			.to('.intro__mobile_skip', {className: '+=intro__mobile_skip light'}, '<')
			.to('.intro__mobile', {duration: 4, opacity: 1})



			.add('scene-5') // scene 5
			.to('.intro__mobile .scene-4 h4 .word .char', {y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.003, onComplete: () => {
				gsap.set('.intro__mobile .scene-4 h4 .word .char', {clearProps: 'transform,opacity'});
			}})
			.to('.intro__mobile .scene-4 h3 .word .char', {y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01, onComplete: () => {
				gsap.set('.intro__mobile .scene-4, .intro__mobile .scene-4 h3 .word .char', {clearProps: 'transform,opacity,visibility'});
			}},'<')
			.to('.intro__mobile .logo', {y: '-100%', opacity: 0, duration: 2, ease: 'expo.inOut'}, '<')
			.to('.intro__mobile_preview_wrapper', {scale: 1, y: '-6vw', duration: 2, ease: 'expo.in'}, '-=1.2')
			.to('.intro__mobile_preview_site_overlay.first', {opacity: 0, duration: 2, ease: 'power1.out'}, '-=1.2')
			.to('.intro__mobile_skip', {className: '+=intro__mobile_skip'}, '<')
			.to('.intro__mobile_preview_site', {y: '-57.4%', duration: 2, ease: 'expo.inOut'}, '-=1')
			.to('.intro__mobile .intro__progress_controls .control span', {backgroundColor: '#FFFFFF', duration: 1, ease: 'expo.out'}, '<')
			.to('.intro__mobile_preview_frame', {opacity: 0, duration: 0.5, ease: 'none'}, '-=2')
			.to('.intro__mobile_preview_site .static', {filter: "blur(5px)", duration: 0.5, ease: 'power1.out'})
			.to('.intro__mobile_preview_site_overlay.second', {opacity: 1, duration: 1, ease: 'power1.out'}, '<')
			.to('.intro__mobile_preview_site .dynamic', {duration: 0, clipPath:"inset(74.1% 37.15% 8.8% 4% round 15px)"}, '<')
			.to('.intro__mobile_skip', {className: '+=intro__mobile_skip light'}, '<')
			.set('.intro__mobile .intro__preview_notes .box-1', {visibility: 'visible'})
			.from('.intro__mobile .intro__preview_notes .box-1 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-1 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__mobile .intro__preview_notes .box-1 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-1 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__mobile .intro__preview_notes .box-1 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__mobile .intro__preview_notes .box-1 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro__mobile', {duration: 4, opacity: 1})
			.to('.intro__mobile .intro__preview_notes .box-1', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-1', {clearProps: 'all'});
			}})


			.add('scene-6') // scene 6
			.to('.intro__mobile_preview_site_overlay.second', {opacity: 0, duration: 1, ease: 'power1.out'})
			.to('.intro__mobile_skip', {className: '+=intro__mobile_skip'}, '<')
			.to('.intro__mobile .intro__progress_controls .control span', {backgroundColor: '#222222', duration: 1, ease: 'expo.out',}, '<')
			.to('.intro__mobile_preview_site .static', {filter: "blur(0px)", duration: 0.5, ease: 'power1.out'}, '<')
			.to('.intro__mobile_preview_site', {y: '0%', duration: 2, ease: 'expo.inOut'}, '<')
			.set('.intro__mobile_preview_menu', {visibility: 'visible'})
			.from('.intro__mobile_preview_menu', {duration: 2, x: '100%', ease: 'expo.out'})
			.to('.intro__mobile_preview_site .static', {filter: "blur(5px)", duration: 0.5, ease: 'power1.out'})
			.to('.intro__mobile_skip', {className: '+=intro__mobile_skip light'}, '<')
			.to('.intro__mobile_preview_menu .dynamic', {opacity: 1, duration: 0.5, ease: 'power1.out'}, '<')
			.to('.intro__mobile_preview_menu_overlay', {autoAlpha: 1, duration: 1, ease: 'power1.out'}, '<')
			.to('.intro__mobile .intro__progress_controls .control span', {backgroundColor: '#FFFFFF', duration: 1, ease: 'expo.out',}, '<')
			.to('.intro__mobile_preview_menu .static', {filter: "blur(5px)", duration: 0.5, ease: 'power1.out'}, '<')
			.fromTo('.intro__mobile_preview_menu .dynamic', {clipPath:"circle(0% at 51% 51%)"}, {clipPath:"circle(25% at 51% 51%)", duration: 1, ease: 'expo.inOut'})
			.set('.intro__mobile .intro__preview_notes .box-2', {visibility: 'visible'})
			.from('.intro__mobile .intro__preview_notes .box-2 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-2 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__mobile .intro__preview_notes .box-2 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-2 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__mobile .intro__preview_notes .box-2 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__mobile .intro__preview_notes .box-2 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro__mobile', {duration: 4, opacity: 1})
			.to('.intro__mobile .intro__preview_notes .box-2', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-2', {clearProps: 'all'});
			}})



			.add('scene-7') // scene 7
			.to('.intro__mobile_preview_menu .dynamic', {clipPath:"circle(10.5% at 50% 22%)", duration: 2, ease: 'expo.inOut'})
			.set('.intro__mobile .intro__preview_notes .box-3', {visibility: 'visible'})
			.from('.intro__mobile .intro__preview_notes .box-3 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-3 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__mobile .intro__preview_notes .box-3 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-3 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__mobile .intro__preview_notes .box-3 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__mobile .intro__preview_notes .box-3 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro__mobile', {duration: 4, opacity: 1})
			.to('.intro__mobile .intro__preview_notes .box-3', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-3', {clearProps: 'all'});
			}})
			.to('.intro__mobile_preview_menu .dynamic', {clipPath:"circle(0% at 50% 22%)", duration: 1, ease: 'expo.in'}, '<')
			.to('.intro__mobile_preview_menu_overlay', {autoAlpha: 0, duration: 1, ease: 'power1.out'})
			.to('.intro__mobile_skip', {className: '+=intro__mobile_skip'}, '<')
			.to('.intro__mobile .intro__progress_controls .control span', {backgroundColor: '#222222', duration: 1, ease: 'expo.out',}, '<')
			.to('.intro__mobile_preview_site .static', {filter: "blur(0px)", duration: 0.5, ease: 'power1.out'}, '-=0.5')
			.to('.intro__mobile_preview_menu .static', {filter: "blur(0px)", duration: 0.5, ease: 'power1.out'}, '<')
			.to('.intro__mobile_preview_menu .dynamic', {opacity: 0, duration: 0.5, ease: 'power1.out'}, '<')
			.to('.intro__mobile_preview_menu', {duration: 2, x: '100%', ease: 'expo.inOut'}, '<')



			.add('scene-8') // scene 8
			.to('.intro__mobile_preview_site', {y: '-6.5%', duration: 2, ease: 'expo.inOut'})
			.to('.intro__mobile_preview_site_overlay.second', {opacity: 1, duration: 1, ease: 'power1.out'})
			.to('.intro__mobile .intro__progress_controls .control span', {backgroundColor: '#FFFFFF', duration: 1, ease: 'expo.out',}, '<')
			.set('.intro__mobile_preview_site .segment', {visibility: 'visible'}, '<')
			.from('.intro__mobile_preview_site .segment.text', {opacity: 0, duration: 2, ease: 'expo.in'}, '-=1')
			.from('.intro__mobile_preview_site .segment.step', {opacity: 0, stagger: {amount: 1}, ease: 'expo.in'}, '-=0.5')
			.set('.intro__mobile .intro__preview_notes .box-4', {visibility: 'visible'})
			.from('.intro__mobile .intro__preview_notes .box-4 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-4 h3 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=0.2')
			.from('.intro__mobile .intro__preview_notes .box-4 p .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-4 p .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.fromTo('.intro__mobile .intro__preview_notes .box-4 .curve', {drawSVG:"0%"}, {duration: 0.5, drawSVG:"100%"}, '-=2')
			.fromTo('.intro__mobile .intro__preview_notes .box-4 .arrow', {drawSVG:"0%"}, {duration: 0.3, drawSVG:"100%"}, '-=1.5')
			.to('.intro__mobile', {duration: 4, opacity: 1})
			.to('.intro__mobile .intro__preview_notes .box-4', {opacity: 0, duration: 1, ease: 'power1.out', onComplete: () => {
				gsap.set('.intro__mobile .intro__preview_notes .box-4', {clearProps: 'all'});
			}})
			.to('.intro__mobile_preview_site .segment.text', {opacity: 0, duration: 2, ease: 'expo.out', onComplete: () => {
				gsap.set('.intro__mobile_preview_site .segment.text', {clearProps: 'all'});
			}}, '-=1')
			.to('.intro__mobile_preview_site', {y: '-22%', duration: 2, ease: 'expo.inOut'}, '<')
			.to('.intro__mobile', {duration: 2, opacity: 1})
			.to('.intro__mobile_preview_site .segment.step', {opacity: 0, stagger: {amount: 0.5}, ease: 'expo.in'})
			.to('.intro__mobile_preview', {opacity: 0, duration: 2, ease: 'expo.out',}, '-=0.5')



			.add('scene-9') // scene 9
			.set('.intro__mobile .scene-5', {visibility: 'visible'})
			.set('.intro__mobile .logo', {y: 0}, '<')
			.to('.intro__mobile .intro__progress_controls .control span', {backgroundColor: '#222222', duration: 1, ease: 'expo.out'}, '<')
			.to('.intro__mobile .logo', {opacity: 1, duration: 2, ease: 'expo.inOut'}, '-=1.5')
			.from('.intro__mobile .scene-5 .word .char', {y: '100%', z: 0, opacity: 0, duration: 3, ease: 'expo.out', stagger: 0.02, onComplete: () => {
				gsap.set('.intro__mobile .scene-5 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.to('.intro__mobile .scene-5 .word .char', {delay: 3, y: '-100%', opacity: 0, duration: 1.2, ease: 'expo.in', stagger: 0.01})
			.set('.intro__mobile .scene__testimonials', {visibility: 'visible'})
			.from('.intro__mobile .scene__testimonials_box:nth-child(1) .scene__testimonial:nth-child(1)', {opacity: 0, duration: 1, ease: "power1.inOut"})
			.from('.intro__mobile .scene__testimonials_box:nth-child(1) .scene__testimonial:nth-child(2)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.from('.intro__mobile .scene__testimonials_box:nth-child(1) .scene__testimonial:nth-child(3)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.to('.intro__mobile', {duration: 6, opacity: 1})
			.to('.intro__mobile .scene__testimonials_box:nth-child(1) .scene__testimonial:nth-child(1)', {opacity: 0, duration: 1, ease: "power1.inOut"})
			.to('.intro__mobile .scene__testimonials_box:nth-child(1) .scene__testimonial:nth-child(2)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.to('.intro__mobile .scene__testimonials_box:nth-child(1) .scene__testimonial:nth-child(3)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.from('.intro__mobile .scene__testimonials_box:nth-child(2) .scene__testimonial:nth-child(1)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=1.25')
			.from('.intro__mobile .scene__testimonials_box:nth-child(2) .scene__testimonial:nth-child(2)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.from('.intro__mobile .scene__testimonials_box:nth-child(2) .scene__testimonial:nth-child(3)', {opacity: 0, duration: 1, ease: "power1.inOut"}, '-=0.5')
			.to('.intro__mobile', {duration: 6, opacity: 1})
			.to([
				'.intro__mobile .scene__testimonials_box:nth-child(2) .scene__testimonial:nth-child(1)', 
				'.intro__mobile .scene__testimonials_box:nth-child(2) .scene__testimonial:nth-child(2)', 
				'.intro__mobile .scene__testimonials_box:nth-child(2) .scene__testimonial:nth-child(3)'], {opacity: 0, stagger: 0.25, ease: "power1.inOut"})



			.add('final-scene') // final scene
			.to('.intro__mobile_overlay', {autoAlpha: 0, duration: 0.5, ease: 'none'})
			.to('.intro__mobile .intro__progress_controls .control', {autoAlpha: 0, stagger: 0.05, ease: 'expo.out'})
			.to('.intro__mobile_skip', {autoAlpha: 0, duration: 1, ease: 'expo.out'}, '<')
			.set('.intro__mobile .scene-6', {visibility: 'visible', opacity: 1, zIndex: 10}, '-=1')
			.to('.intro__mobile .scene-6 .scene__overlay', {duration: 2, autoAlpha: 1, ease: 'expo.out' }, '<')
			.from('.intro__mobile .scene-6 h2 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .scene-6 h2 .word .char', {clearProps: 'transform,opacity'});
			}}, '-=1')
			.from('.intro__mobile .scene-6 h3 .word .char', {y: '100%', z: 0, opacity: 0, duration: 2, ease: 'expo.out', stagger: 0.005, onComplete: () => {
				gsap.set('.intro__mobile .scene-6 h2 .word .char', {clearProps: 'transform,opacity'});
			}}, '<')
			.from('.intro__mobile .scene-6 .buttons', {opacity: 0, duration: 2, ease: 'expo.inOut'}, '-=1.5')
			.from('.intro__mobile .scene-6 .action', {opacity: 0, duration: 2, ease: 'expo.inOut', onComplete: () => {
				let st = 0;
				document.addEventListener("wheel", function(){ 
				   st++;
				   if(st > 0 && st < 2) {
				   		gsap.to('.intro__mobile', {y: '-100%', autoAlpha: 0, duration: 2, ease: 'expo.inOut', onComplete: () => {
				   			gsap.set('.intro__mobile', {display: 'none'});
				   			gsap.set('html, body', {height: 'auto', overflow: 'auto'});
				   		}});
				   		gsap.from('#main', {y: '100vh', opacity: 0, duration: 2, ease: 'expo.inOut'});
				   		
				   }
				});
			}}, '-=1.3')
			.add('end');


			const labels = Object.values(introMobileTL.seek(getNestedLabelTime(introMobileTL, null)).labels);

			introMobileTL
				.to(document.querySelectorAll('.intro__progress_controls .control')[0].querySelector('span'), {width: '102%', duration: labels[1] - labels[0], ease: "power1.inOut"}, 'scene-1')
				.to(document.querySelectorAll('.intro__progress_controls .control')[1].querySelector('span'), {width: '102%', duration: labels[2] - labels[1], ease: "power1.inOut"}, 'scene-2')
				.to(document.querySelectorAll('.intro__progress_controls .control')[2].querySelector('span'), {width: '102%', duration: labels[3] - labels[2], ease: "power1.inOut"}, 'scene-3')
				.to(document.querySelectorAll('.intro__progress_controls .control')[3].querySelector('span'), {width: '102%', duration: labels[4] - labels[3], ease: "power1.inOut"}, 'scene-4')
				.to(document.querySelectorAll('.intro__progress_controls .control')[4].querySelector('span'), {width: '102%', duration: labels[5] - labels[4], ease: "power1.inOut"}, 'scene-5')
				.to(document.querySelectorAll('.intro__progress_controls .control')[5].querySelector('span'), {width: '102%', duration: labels[6] - labels[5], ease: "power1.inOut"}, 'scene-6')
				.to(document.querySelectorAll('.intro__progress_controls .control')[6].querySelector('span'), {width: '102%', duration: labels[7] - labels[6], ease: "power1.inOut"}, 'scene-7')
				.to(document.querySelectorAll('.intro__progress_controls .control')[7].querySelector('span'), {width: '102%', duration: labels[8] - labels[7], ease: "power1.inOut"}, 'scene-8')
				.to(document.querySelectorAll('.intro__progress_controls .control')[8].querySelector('span'), {width: '102%', duration: labels[9] - labels[8], ease: "power1.inOut"}, 'scene-9');
		


		// document.querySelector('.intro__skip').addEventListener('click', (e) => {
		// 	introTL.play('final-scene');
		// 	e.target.classList.add('hidden');
		// });


		GSDevTools.create({
			container: '.intro__mobile',
			animation: introMobileTL
		});

		introMobileTL.restart();




	}
			


			








	let detectObj = null;


	function applyOrientation() {

		if (window.innerHeight < window.innerWidth) {
			detectObj = 'landscape';
		} 
		if(window.innerHeight > window.innerWidth) {
				detectObj = 'portrait';
		}
	}



	/*document ready*/
	$(document).ready(function(){

		applyOrientation();



		$('form input:not([type="search"]), form textarea').wrap('<div class="field"></div>');

		$('form .field').append('<span class="field__label">');

		$('form .field__label').each(function() {
			var pht = $(this).parent().find('input').attr('placeholder');
			pht !== undefined ? $(this).text(pht) : null;
		});


		$('form input').focus(function() {
      $(this).parents('.field').addClass('focus');
    }).blur(function() {
      if(!$(this).val()) {
        $(this).parents('.field').removeClass('focus');
      }
    });




		$('.btn:not(.btn-alt)').hover(function() {
			$(this).stop().removeClass('out').addClass('in');
		}, function() {
			$(this).stop().removeClass('in').addClass('out');
		});



		
		/* ---------- hamburger ---------- */

		$('.hamburger').on('click', function() {
			$(this).stop().toggleClass('opened');
			$('.mobile__nav').stop().addClass('show');
		});


		$('.mobile__nav .button__close').on('click', function() {
			$('.mobile__nav').stop().removeClass('show');
			$('.hamburger').stop().removeClass('opened');
		});





		/* ---------- header ---------- */

		$('.main__header_search_box form .toggle').on('click', function() {
			$(this).parents('.main__header_search_box').stop().toggleClass('collapsed');
		});

		$(document).on('click touchstart', function (event) {
			if (!$(event.target).closest('.main__header_search_box').length) {
				$('.main__header_search_box').stop().addClass('collapsed');
			}
		});



		var lastScrollTop = $(window).scrollTop();

		lastScrollTop > 0 ? $('.main__header').stop().addClass('sticky') : $('.main__header').stop().removeClass('sticky');


		$(window).on('scroll', function(){
			var st = $(this).scrollTop();
			st > 0 ? $('.main__header').stop().addClass('sticky') : $('.main__header').stop().removeClass('sticky');
		});


		$('.main__header .mobile__search').on('click', function() {
			$('.main__header_search_box').stop().addClass('show');
		});

		$('.main__header_search_box_form .close').on('click', function() {
			$('.main__header_search_box').stop().removeClass('show');
		});



		/* ---------- socials ---------- */


		if($(window).width() < 1200) {
			$('.socials .has-submenu a').on('click', function() {
				$(this).parent().stop().toggleClass('active');
			});
		}
		

		if($(window).width() > 1199) {
			$('.socials .has-submenu').hover(function() {
				$(this).stop().toggleClass('active');
			});
		}
		






		/* ---------- tabs ---------- */

		$('.tabs').each(function() {
			tabs($(this), '.tab', '.tab__panel');
		});




		/* ---------- rate ---------- */

		$('.rate__box').each(function() {
			$(this).find('li').on('click', function() {
				$(this).prevAll().stop().addClass('checked');
				$(this).stop().addClass('checked');
				$(this).nextAll().stop().removeClass('checked');
			});
		});


		/* ---------- favorites ---------- */

		$('.favorites__link').on('click', function() {
			$(this).stop().toggleClass('selected');
		});



		/* ---------- hero ---------- */

		$('.hero__actions_list li').each(function(index) {
			var thisBgSrc = $(this).attr('data-bg-src');
			$('.hero__overlays').append('<div><span></span></div>');
			$('.hero__overlays div > span')[index].style.backgroundImage = "url('img/" + thisBgSrc + "')";
			$(this).hover(function() {
				$('.hero__overlays div')[$(this).index()].classList.add('show');
			}, function() {
				$('.hero__overlays div').stop().removeClass('show');
			});
		});







		/* ---------- featured sliders ---------- */


		$('.cards__slider').each(function() {



			var slider = $(this),
					slidesLength = slider.find('.slide__item').length,
					desktopCount = +slider.attr('data-desktop-show'),
					tabletCount = +slider.attr('data-tablet-show'),
					mobileCount = +slider.attr('data-mobile-show'),
					showDots = null;

					if($(window).width() > 1199 && slidesLength > desktopCount) {
						showDots = true;
					}
					else if($(window).width() > 767 && $(window).width() < 1200 && slidesLength > tabletCount) {
						showDots = true;
					}
					else if($(window).width() < 768 && slidesLength > mobileCount) {
						showDots = true;
					}
					else {
						showDots = false;
						slider.parent().addClass('less');
					}




			slider.slick({
				slidesToShow: desktopCount,
				slidesToScroll: 1,
				speed: 500,
				swipe: true,
				arrows: true,
				dots: showDots,
				infinite: true,
				// autoplay: true,
				// autoplaySpeed: 7000,
				prevArrow: '<button class="prev-slide"></button>',
				nextArrow: '<button class="next-slide"></button>',
				responsive: [
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: tabletCount,
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: mobileCount,
						}
					},
				]
			});


		});








		/* ---------- modal window ---------- */

		document.querySelectorAll('.modal__open').forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();

				$('.main__header').stop().addClass('modal-active');

				let href = link.getAttribute('href').slice(1);
				document.querySelectorAll('.modal__window').forEach((modalWindow) => {
					let id = modalWindow.getAttribute('id');
					modalWindow.classList.remove('show');
					href == id ? modalWindow.classList.add('show') : null;
				});
			});
		});

		document.addEventListener('click', (e) => {
			e.target.classList.contains('modal__window_close') || 
			e.target.classList.contains('modal__window_close_icon') ||
			e.target.classList.contains('modal__window_overlay') ? document.querySelectorAll('.modal__window').forEach((modalWindow) => {
				modalWindow.classList.remove('show');
				$('.main__header').stop().removeClass('modal-active');
			}) : null
		});




		$('.description__types_toggle').on('click', function() {
			$(this).stop().toggleClass('open');
			$(this).parents('.description').find('.description__types').stop().slideToggle(400);
		});






		/* ---------- interactive grid ---------- */


		if($(window).width() > 767 && $(window).height() > 499) {

			$('.interactive__grid_column').on('click', function() {
				let currentClass = `open-${$(this).index() + 1}`;
				if($(this).parent().hasClass(currentClass)) {
					$(this).parent().stop().removeClass(`${currentClass} show`);
				}
				else {
					$(".interactive__grid").attr('class', 'interactive__grid');
					$(this).parent().stop().addClass(`${currentClass} show`);
				}

			});


			$('.interactive__grid .content__box_title span').each(function() {
				let charsArray = $(this).text().split('');
				let newHTML = charsArray.map(char => {
					return `<span class="outer"><span class="inner">${char}</span></span>`;
				});

				$(this).html(newHTML);
			});
		}



		if( ($(window).width() < 900 && $(window).height() > 500) ||  $(window).width() < 768 ) {
			$('.interactive__grid_column:first-of-type .content__box_title').stop().addClass('show-text');
			$('.interactive__grid .content__box_title').on('click', function() {
				$('.interactive__grid .content__box_title').not($(this)).stop().removeClass('show-text');
				$(this).stop().toggleClass('show-text');
				$('.interactive__grid .content__box_text').not($(this).parent().find('.content__box_text')).stop().slideUp(400);
				$(this).parent().find('.content__box_text').stop().slideToggle(400);
			});

		}


		

		

		




	});











	/*window load*/
	$(window).on('load', function() {

	});




	






	/*window resize*/
	$(window).resize(function() {

		applyOrientation();
		
	});




})(jQuery);	


	