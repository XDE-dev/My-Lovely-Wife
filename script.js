// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor effect
  const cursor = document.querySelector(".custom-cursor")
  const links = document.querySelectorAll("a")

  if (cursor) {
    // Show the custom cursor
    cursor.style.display = "block"

    // Update cursor position
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })

    // Enlarge cursor when hovering over links
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursor.style.backgroundColor = "rgba(255, 133, 162, 0.3)"
      })

      link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.backgroundColor = "rgba(255, 133, 162, 0.5)"
      })
    })
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for the sticky header
          behavior: "smooth",
        })
      }
    })
  })

  // Add active class to current navigation link
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href")
    if ((currentPage === "" || currentPage === undefined) && linkHref === "firstpage.html") {
      link.classList.add("active")
    } else if (linkHref === currentPage) {
      link.classList.add("active")
    }
  })

  // Create scroll progress indicator
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  document.body.appendChild(progressBar)

  // Update scroll progress indicator
  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY

    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
    progressBar.style.width = scrollPercentage + "%"
  })

  // Create decorative elements that follow scroll
  for (let i = 0; i < 5; i++) {
    const decoration = document.createElement("div")
    decoration.className = "scroll-decoration"
    decoration.style.left = Math.random() * 100 + "vw"
    decoration.style.top = Math.random() * 100 + "vh"
    document.body.appendChild(decoration)
  }

  // Update decorative elements position on scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY
    const decorations = document.querySelectorAll(".scroll-decoration")

    decorations.forEach((decoration, index) => {
      const speed = 0.05 * (index + 1)
      decoration.style.transform = `translateY(${scrollTop * speed}px)`
    })
  })

  // Add scroll animations to elements
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    // Add different animation classes based on section index
    const animationClasses = [
      "fade-in",
      "slide-up",
      "slide-left",
      "slide-right",
      "zoom-in",
      "zoom-out",
      "reveal-animation",
    ]

    // Select animation class based on section index
    const animationClass = animationClasses[index % animationClasses.length]
    section.classList.add("scroll-animate", animationClass)

    // Add staggered animations to children elements
    const children = section.querySelectorAll(
      ".card, .polaroid, .reason-card, .timeline-item, .favorite-category, .quality-card, .kid-profile, .moment-card",
    )
    children.forEach((child, childIndex) => {
      child.classList.add("scroll-animate", "fade-in", `delay-${(childIndex % 5) + 1}`)
    })
  })

  // Check if elements are in viewport and add active class
  function checkScrollAnimations() {
    const animatedElements = document.querySelectorAll(".scroll-animate")

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementBottom = element.getBoundingClientRect().bottom
      const windowHeight = window.innerHeight

      // If element is in viewport
      if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
        element.classList.add("active")
      }
    })
  }

  // Run animation check on scroll and on page load
  window.addEventListener("scroll", checkScrollAnimations)
  checkScrollAnimations() // Run once on page load

  // Add floating animation to specific elements
  const floatElements = document.querySelectorAll(".hero-image-container, .big-heart, .countdown-container")
  floatElements.forEach((element) => {
    element.classList.add("float-element")
  })

  // Add heartbeat animation to heart icons
  const heartIcons = document.querySelectorAll(".heart")
  heartIcons.forEach((heart) => {
    heart.classList.add("heartbeat")
  })

  // Add shimmer effect to buttons
  const buttons = document.querySelectorAll(".cute-button")
  buttons.forEach((button) => {
    button.classList.add("shimmer")
  })

  // Add confetti effect function
  function createConfetti(x, y) {
    const confettiContainer = document.createElement("div")
    confettiContainer.style.position = "fixed"
    confettiContainer.style.top = "0"
    confettiContainer.style.left = "0"
    confettiContainer.style.width = "100%"
    confettiContainer.style.height = "100%"
    confettiContainer.style.pointerEvents = "none"
    confettiContainer.style.zIndex = "9998"
    document.body.appendChild(confettiContainer)

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"
      confetti.style.left = x - 5 + Math.random() * 10 + "px"
      confetti.style.top = y - 5 + Math.random() * 10 + "px"
      confetti.style.width = 5 + Math.random() * 10 + "px"
      confetti.style.height = 5 + Math.random() * 10 + "px"
      confetti.style.animationDuration = 2 + Math.random() * 2 + "s"
      confettiContainer.appendChild(confetti)

      setTimeout(() => {
        confetti.classList.add("active")
      }, 10)
    }

    // Remove confetti container after animation completes
    setTimeout(() => {
      confettiContainer.remove()
    }, 5000)
  }

  // Add confetti effect to interactive heart
  const interactiveHeartElement = document.getElementById("interactive-heart")
  if (interactiveHeartElement) {
    interactiveHeartElement.addEventListener("click", function (e) {
      createConfetti(e.clientX, e.clientY)

      // Create a floating heart animation on click
      const newHeart = document.createElement("span")
      newHeart.textContent = "♡"
      newHeart.className = "click-heart"
      newHeart.style.position = "absolute"
      newHeart.style.left = "50%"
      newHeart.style.top = "50%"
      newHeart.style.color = "var(--primary-pink)"
      newHeart.style.fontSize = "2rem"
      newHeart.style.pointerEvents = "none"
      newHeart.style.zIndex = "2"
      newHeart.style.transform = "translate(-50%, -50%)"
      newHeart.style.animation = "floatUp 2s ease-out forwards"

      this.appendChild(newHeart)

      // Update heart counter
      const heartCount = document.getElementById("heart-count")
      if (heartCount) {
        heartCount.textContent = (Number.parseInt(heartCount.textContent) + 1).toString()
      }

      // Remove the heart element after animation completes
      setTimeout(() => {
        newHeart.remove()
      }, 2000)
    })
  }

  // Add keyframes for the floating heart animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -200%) scale(1.5);
                opacity: 0;
            }
        }
        
        .click-heart {
            position: absolute;
            pointer-events: none;
        }
    `
  document.head.appendChild(style)

  // Anniversary countdown
  const countdownDays = document.getElementById("countdown-days")
  const countdownHours = document.getElementById("countdown-hours")
  const countdownMinutes = document.getElementById("countdown-minutes")
  const countdownSeconds = document.getElementById("countdown-seconds")

  if (countdownDays && countdownHours && countdownMinutes && countdownSeconds) {
    // Set your anniversary date here (format: year, month-1, day)
    // Example: June 15, 2023
    const anniversaryDate = new Date(2023, 5, 15)

    // Calculate the next anniversary
    const currentDate = new Date()
    let nextAnniversary = new Date(currentDate.getFullYear(), anniversaryDate.getMonth(), anniversaryDate.getDate())

    // If this year's anniversary has passed, set for next year
    if (nextAnniversary < currentDate) {
      nextAnniversary = new Date(currentDate.getFullYear() + 1, anniversaryDate.getMonth(), anniversaryDate.getDate())
    }

    function updateCountdown() {
      const currentTime = new Date()
      const diff = nextAnniversary - currentTime

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      // Update the countdown display
      countdownDays.textContent = days.toString().padStart(2, "0")
      countdownHours.textContent = hours.toString().padStart(2, "0")
      countdownMinutes.textContent = minutes.toString().padStart(2, "0")
      countdownSeconds.textContent = seconds.toString().padStart(2, "0")
    }

    // Initial update
    updateCountdown()

    // Update every second
    setInterval(updateCountdown, 1000)
  }

  // Add parallax effect to sections
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY
    const parallaxElements = document.querySelectorAll(
      ".hero-section, .love-letter-section, .reasons-section, .polaroid-section, .countdown-section, .interactive-heart-section",
    )

    parallaxElements.forEach((element, index) => {
      const speed = 0.1 * ((index % 2) + 1)
      const yPos = scrollTop * speed
      element.style.backgroundPosition = `center ${-yPos}px`
    })
  })

  // Add 3D tilt effect to cards
  const tiltElements = document.querySelectorAll(".reason-card, .quality-card, .kid-card, .polaroid")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = x / rect.width
      const yPercent = y / rect.height

      const xRotation = (yPercent - 0.5) * 10 // -5 to 5 degrees
      const yRotation = (0.5 - xPercent) * 10 // -5 to 5 degrees

      this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`
    })

    element.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })
})
