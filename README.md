# Belated Happy Birthday Ridhi! 🎂✨

An interactive animated birthday experience celebrating 7 years of friendship (2019-2025).

## Features

- 🎬 **7 Cinematic Scenes** - Scroll-based storytelling experience
- 🎨 **Splash Screen** - Circular image intro with birthday greeting
- 🫧 **Interactive Memory Bubbles** - 7 years (2019-2025) with clickable bubbles
- ❓ **Mystery Questions** - 21 personalized questions (3 per year) in tree structure modals
- 📝 **Form Integration** - Formspree integration to receive Ridhi's responses
- ⭐ **Constellation Scene** - Animated canvas with 200 floating stars
- ∞ **Infinity Symbol** - SVG animation with 6 orbiting particles, pulsing rings, color shifts
- 💌 **Personal Message** - Heartfelt message from GP to Ridhi
- 🎆 **Birthday Finale** - Fireworks celebration scene
- 🎁 **Gift Box Animation** - 3D opening animation with confetti burst
- 🎥 **Video Reveal** - Fullscreen modal with birthday video
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile

## Project Structure

- `index.html` - Main deployment file (same as experience.html)
- `experience.html` - Primary working file with all features
- `ridhi-image.jpg` - Splash screen image
- `ridhi_video.mp4` - Birthday video for gift box reveal
- `experience_backup.html` - Backup version

## Scene Breakdown

1. **Opening** - "7 Years" intro with fade-in animation
2. **Constellation** - Poetic text with animated star connections
3. **Infinity Symbol** - Orbiting particles with "Friendship that never ends"
4. **Message** - Personal letter from GP with highlighted phrases
5. **Memory Bubbles** - Interactive year bubbles (2019-2025) with mystery questions
6. **Birthday Finale** - "Belated Happy Birthday" with fireworks
7. **Gift Box** - 3D animated gift box that opens to reveal fullscreen video

## Customization Guide

### Edit Bubble Questions
Open `experience.html` or `index.html` and find the `bubbleData` object (around line 2090). Each year has 3 questions with customizable:
- `icon` - Emoji (🔮, 🧩, ❓)
- `title` - Question heading
- `question` - The actual question
- `answer` - Placeholder text for input field

### Change Personal Message
Find "Scene 5: Message" section (around line 1840) to edit the heartfelt letter.

### Update Media Files
Replace these files with your own:
- `ridhi-image.jpg` - Splash screen photo
- `ridhi_video.mp4` - Birthday video

### Modify Formspree Endpoint
In JavaScript section, find the form submission URL: `https://formspree.io/f/mvzzarze`

## Tech Stack

- **HTML5** - Single-file architecture
- **CSS3** - Keyframe animations, glassmorphism, gradients, flexbox
- **JavaScript** - Intersection Observer API, Canvas API, Fetch API
- **External Services** - Formspree (form submission), Google Fonts (Playfair Display, Poppins)
- **No frameworks** - Pure vanilla JavaScript
- Canvas API for particle effects

## Browser Support

Works best on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Tips

- View on a large screen for the best experience
- Works great on mobile too!
- Share the link or host it online for easy access

---

Made with ❤️ by Gautam Prajapati
