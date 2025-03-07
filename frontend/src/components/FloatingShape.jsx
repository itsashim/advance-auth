// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function FloatingShape({color,size,top,left,delay}) {
    return (
        <motion.div 
        style={{ top, left }}
        className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
        animate={{
            y: ["0%","100%","0%"],
            x: ["0%","100%","0%"],
            roate:[0,360]
        }}
        transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            delay
        }}
        aria-hidden="true"
        >
            
        </motion.div>
    )
}

export default FloatingShape
