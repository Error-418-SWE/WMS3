import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

function Wharehouse(){
	return (
		<div id="canvas">
			<Canvas style={{height: "100%", width: "100%"}}>
				<pointLight position={[10, 10, 10]} />
    			<mesh>
				<sphereGeometry />
      <meshStandardMaterial color="hotpink" />
    			</mesh>
			</Canvas>
		</div>
	)
}

export default Wharehouse;