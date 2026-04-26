import { useEffect, useRef } from 'react'
import followerImage from '../assets/images/ruu_follower.png'
import styles from './CursorFollower.module.css'

export function CursorFollower() {
  const followerRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let centerX = -50
    let centerY = -50
    let angle = 0
    const orbitRadius = 55
    const orbitSpeed = 0.4
    const centerEase = 0.04
    let lastTime = performance.now()
    let frameId = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const animate = (now: number) => {
      const follower = followerRef.current
      if (!follower) return

      const dt = (now - lastTime) / 1000
      lastTime = now

      centerX += (mouseX - centerX) * centerEase
      centerY += (mouseY - centerY) * centerEase
      angle += orbitSpeed * dt

      const x = centerX + orbitRadius * Math.cos(angle)
      const y = centerY + orbitRadius * Math.sin(angle)

      follower.style.left = `${x}px`
      follower.style.top = `${y}px`
      frameId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    frameId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <img
      ref={followerRef}
      src={followerImage}
      alt=""
      className={styles.cursorFollower}
    />
  )
}
