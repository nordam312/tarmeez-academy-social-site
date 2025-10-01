# Tarmeez Academy - Community Platform

A fully functional social media web application built during my studies with **Tarmeez Academy**. This platform serves as a community hub for Tarmeez Academy students and developers to connect, share projects, seek help, and collaborate.

## 🌟 Project Purpose

This platform was created to facilitate communication and collaboration among Tarmeez Academy members by providing:

- **Community Connection**: Stay connected with fellow students and developers
- **Project Showcase**: Share your coding projects and get feedback from the community
- **Peer Support**: Ask questions and get help through posts and comments
- **Learning Together**: Discuss programming concepts, share resources, and learn from each other
- **Profile Building**: Create your developer profile and track your contributions

## ✨ Key Features

### 🔐 User Authentication
- Secure registration and login system
- JWT token-based authentication
- Session management with localStorage
- Logout functionality

### 📝 Post Management
- **Create Posts**: Share your thoughts, projects, or questions with the community
- **Edit Posts**: Update your posts anytime
- **Delete Posts**: Remove posts you no longer want to share
- **Image Upload**: Attach images to your posts (project screenshots, diagrams, etc.)
- **Rich Content**: Share code snippets, tutorials, or project updates

### 💬 Interactive Comments
- Comment on community posts
- Real-time comment updates
- Engage in discussions and provide help
- Build conversations around shared projects

### 👤 Personal Profiles
- Personalized profile pages for each user
- View user statistics (posts count, comments count)
- Browse all posts by a specific user
- Profile pictures and bio information
- Track your contributions to the community

### 🎨 Modern UI/UX
- **Dark Theme**: Eye-friendly dark mode with teal accent colors (#0D5B57)
- **Smooth Animations**: Elegant transitions and hover effects
- **Loading States**: Visual feedback during data fetching
- **Responsive Modals**: Clean dialogs for create/edit operations
- **Intuitive Navigation**: Easy-to-use navbar with quick access to features

### 📱 Fully Responsive Design
- Mobile-first approach
- Optimized for smartphones, tablets, and desktops
- Breakpoints at 768px and 480px
- Touch-friendly interface for mobile users
- Adaptive layouts that work seamlessly across all devices

### 🌐 RTL Support
- Right-to-left layout support for Arabic content
- Bilingual interface (Arabic/English)
- Culturally appropriate design for Middle Eastern users

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Custom styling with animations, transitions, and grid/flexbox layouts
- **JavaScript (ES6+)**: Vanilla JS for all functionality - no frameworks!
- **Bootstrap 5**: Responsive grid system and UI components
- **Axios**: HTTP client for seamless API communication
- **Tarmeez Academy API**: RESTful backend integration

## 📂 Project Structure

```
├── index.html              # Home page with posts feed
├── postDetails.html        # Individual post view with comments
├── userProfile.html        # User profile page
├── navbar.html            # Reusable navigation component
├── navbar.js              # Navigation logic and authentication
├── shareNewPost.js        # Post creation functionality
├── styles.css             # Main stylesheet
├── tarmeaz_academy-removebg-preview.png  # Logo and favicon
└── README.md              # Project documentation
```

## 🎯 Use Cases

### For Students
- **Ask for Help**: Post your coding questions and get answers from peers
- **Share Learning**: Document your learning journey and share insights
- **Find Study Partners**: Connect with classmates working on similar topics

### For Developers
- **Showcase Projects**: Display your completed projects to the community
- **Get Feedback**: Receive constructive criticism on your code and designs
- **Collaborate**: Find collaborators for open-source or personal projects

### For The Community
- **Knowledge Sharing**: Create tutorials and guides for others
- **Problem Solving**: Help others debug issues and overcome challenges
- **Networking**: Build professional connections within the developer community

## 🚀 Live Demo

**[View Live Site](https://tarmeez-academy-site.netlify.app/)**

## 💻 Local Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tarmeaz-academy-platform.git

# Navigate to project directory
cd tarmeaz-academy-platform

# Open index.html in your browser
# No build process required - pure HTML/CSS/JS!
```

**Note**: This project requires no dependencies installation. All libraries (Bootstrap, Axios) are loaded via CDN.

## 🎓 Learning Outcomes

Through building this project with Tarmeez Academy, I gained hands-on experience with:

- **API Integration**: Working with RESTful APIs and handling async operations
- **Authentication Flow**: Implementing secure login/logout with JWT tokens
- **State Management**: Managing application state using localStorage
- **Responsive Design**: Creating mobile-first layouts without CSS frameworks
- **DOM Manipulation**: Building dynamic UIs with vanilla JavaScript
- **User Experience**: Implementing loading states, error handling, and smooth animations
- **Clean Code**: Writing maintainable, well-structured code
- **Git & Deployment**: Version control and deploying to production (Netlify)

## 🎨 Design Highlights

- **Color Palette**:
  - Primary: Teal (#0D5B57)
  - Background: Dark Gray (#1C201E, #242021)
  - Accents: Various teal shades (#00897b, #26a69a)

- **Typography**: Tajawal font family for clean Arabic/English text

- **Animations**:
  - Gradient banner rotation
  - Profile image glow effects
  - Card hover transitions
  - Skeleton loading screens

## 🤝 Contributing

This is a student project, but feedback and suggestions are always welcome! Feel free to:
- Report bugs via issues
- Suggest new features
- Share your experience using the platform

## 📄 License

This project is created for educational purposes as part of Tarmeez Academy's curriculum.

## 🙏 Acknowledgments

**Tarmeez Academy** - For providing excellent web development education and the API infrastructure that powers this platform.

---

**Built with ❤️ using HTML, CSS, and vanilla JavaScript - No frameworks required!**

*Connecting developers, one post at a time.*
