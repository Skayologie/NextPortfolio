"use client"

import * as motion from "motion/react-client"
import { useRef } from "react"
import Orb from "./Orb"


export default function DragConstraints(urlImage:string) {
  const constraintsRef = useRef(null)

  return (
    <motion.div ref={constraintsRef} style={constraints}>

        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              backgroundImage: `url(${urlImage})`, // ✅ must use url()
              backgroundSize: "cover", // ✅ makes the image fill nicely
              backgroundPosition: "center",
              }}
        />
    </motion.div>
  )
}

const constraints = {
  width: 400,
  height: 400,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  justifySelf: "center",
}

const box = {
  position: "absolute",
  width: "90%",
  height: "90%",
  borderRadius: "50%",
  backgroundImage: "url('./images/profile1.jpg')", // ✅ must use url()
  backgroundSize: "cover", // ✅ makes the image fill nicely
  backgroundPosition: "center",
}