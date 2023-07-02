import { Flex, useOutsideClick } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

interface DropdownProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
    },
    display: 'block',
  },
  exit: {
    opacity: 0,
    rotateX: -15,

    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
    transitionEnd: {
      display: 'none',
    },
  },
}

export const Dropdown = ({ isOpen, onClose, children }: DropdownProps) => {
  const dropdownRef = useRef(null)

  useOutsideClick({
    ref: dropdownRef,
    handler: () => {
      if (isOpen) {
        onClose()
      }
    },
  })

  return (
    <motion.div
      ref={dropdownRef}
      initial="exit"
      animate={isOpen ? 'enter' : 'exit'}
      variants={subMenuAnimate}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      <Flex flexDir="column" mt={2} bg="gray.900" borderRadius="md" overflow="hidden">
        {children}
      </Flex>
    </motion.div>
  )
}
