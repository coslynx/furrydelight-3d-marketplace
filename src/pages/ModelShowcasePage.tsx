import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { ComponentBaseProps } from 'src/types'
import ModelLoader from 'src/components/3d/ModelLoader'
import 'src/styles/pages/model-showcase.css'
interface ModelShowcasePageProps extends ComponentBaseProps {
}
interface ModelData {
  id: string
  name: string
  modelPath: string
  description: string
}
const ModelShowcasePage: React.FC<ModelShowcasePageProps> = ({ className = '', style }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [modelDataExtracted, setModelDataExtracted] = useState<THREE.Object3D | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const modelList = useMemo(() => [
    { id: '1', name: 'Kibble', modelPath: '/models/kibble.glb', description: 'A tasty kibble.' },
    { id: '2', name: 'Bowl', modelPath: '/models/bowl.glb', description: 'A bright red bowl.' },
    { id: '3', name: 'Bag', modelPath: '/models/bag.glb', description: 'A bag of delicious cat food.' }
  ], [])
  const handleModelSelect = useCallback((modelId: string) => {
    setSelectedModel(modelId)
  }, [])
  const { scene } = useThree()
  const threeScene = useMemo(() => {
    const newScene = new THREE.Scene()
    newScene.background = new THREE.Color('#ffffff')
    return newScene
  }, [])
  useEffect(() => {
    if (selectedModel) {
      setLoading(true)
      setError(null)
      const selectedData = modelList.find(model => model.id === selectedModel)
      if (selectedData) {
        const loader = new THREE.GLTFLoader()
        loader.load(
          selectedData.modelPath,
          (gltf) => {
            setModelDataExtracted(gltf.scene)
            setLoading(false)
          },
          undefined,
          (err) => {
            setError(`Error loading model: ${err.message}`)
            setLoading(false)
          }
        )
      } else {
        setError('Model not found')
        setLoading(false)
      }
    }
  }, [selectedModel, modelList])
  return (
    <div className={`model-showcase-page ${className}`} style={style}>
      <div className="model-list">
        <h2>Available Models</h2>
        <ul>
          {modelList.map((model) => (
            <li key={model.id} onClick={() => handleModelSelect(model.id)}>
              {model.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="model-viewer">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {modelDataExtracted && (
          <>
            <h3>{modelList.find(model => model.id === selectedModel)?.name}</h3>
            <div className="model-description">
              <p>
                {modelList.find(model => model.id === selectedModel)?.description}
              </p>
            </div>
            <ModelLoader modelPath={modelList.find(model => model.id === selectedModel)?.modelPath || ''} />
          </>
        )}
      </div>
    </div>
  )
}
export default ModelShowcasePage