'use client'

import { useState, useEffect } from 'react'

interface AnimationConfig {
  animationType: string
  duration: number
  delay: number
  timingFunction: string
  iterationCount: string
  direction: string
  fillMode: string
  playState: string
}

export function AnimationTool() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  const [animConfig, setAnimConfig] = useState<AnimationConfig>({
    animationType: 'fadeIn',
    duration: 1,
    delay: 0,
    timingFunction: 'ease',
    iterationCount: '1',
    direction: 'normal',
    fillMode: 'both',
    playState: 'running'
  })

  const updateAnimConfig = (key: keyof AnimationConfig, value: string | number) => {
    setAnimConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetAnimConfig = () => {
    setAnimConfig({
      animationType: 'fadeIn',
      duration: 1,
      delay: 0,
      timingFunction: 'ease',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'both',
      playState: 'running'
    })
    setIsAnimating(true)
  }

  const getKeyframes = (type: string) => {
    const keyframes: { [key: string]: string } = {
      fadeIn: `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
      fadeOut: `
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}`,
      slideInLeft: `
@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}`,
      slideInRight: `
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}`,
      slideInUp: `
@keyframes slideInUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}`,
      slideInDown: `
@keyframes slideInDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}`,
      scaleIn: `
@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}`,
      scaleOut: `
@keyframes scaleOut {
  from { transform: scale(1); }
  to { transform: scale(0); }
}`,
      rotate: `
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
      bounce: `
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}`,
      pulse: `
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}`,
      shake: `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}`
    }
    return keyframes[type] || keyframes.fadeIn
  }

  const getAnimationStyle = () => {
    const animationName = animConfig.animationType
    const iterationCount = animConfig.iterationCount === 'infinite' ? 'infinite' : `${animConfig.iterationCount}`
    
    return {
      animationName: animationName,
      animationDuration: `${animConfig.duration}s`,
      animationDelay: `${animConfig.delay}s`,
      animationTimingFunction: animConfig.timingFunction,
      animationIterationCount: iterationCount,
      animationDirection: animConfig.direction,
      animationFillMode: animConfig.fillMode,
      animationPlayState: animConfig.playState
    }
  }

  const getCSSCode = () => {
    const keyframes = getKeyframes(animConfig.animationType)
    const iterationCount = animConfig.iterationCount === 'infinite' ? 'infinite' : `${animConfig.iterationCount}`
    
    return `${keyframes}

.element {
  animation: ${animConfig.animationType} ${animConfig.duration}s ${animConfig.timingFunction} ${animConfig.delay}s ${iterationCount} ${animConfig.direction} ${animConfig.fillMode};
  animation-play-state: ${animConfig.playState};
}`
  }

  const getTailwindCode = () => {
    const keyframes = getKeyframes(animConfig.animationType)
    const iterationCount = animConfig.iterationCount === 'infinite' ? 'infinite' : `${animConfig.iterationCount}`
    
    return `${keyframes}

<div 
  className="..."
  style={{
    animationName: '${animConfig.animationType}',
    animationDuration: '${animConfig.duration}s',
    animationDelay: '${animConfig.delay}s',
    animationTimingFunction: '${animConfig.timingFunction}',
    animationIterationCount: '${iterationCount}',
    animationDirection: '${animConfig.direction}',
    animationFillMode: '${animConfig.fillMode}',
    animationPlayState: '${animConfig.playState}'
  }}
>`
  }

  const copyCSSToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCSS(true)
    setTimeout(() => setCopiedCSS(false), 2000)
  }

  const copyTailwindToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTailwind(true)
    setTimeout(() => setCopiedTailwind(false), 2000)
  }

  const copyModalCSSToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedModalCSS(true)
    setTimeout(() => setCopiedModalCSS(false), 2000)
  }

  const copyModalTailwindToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedModalTailwind(true)
    setTimeout(() => setCopiedModalTailwind(false), 2000)
  }

  const restartAnimation = () => {
    setIsAnimating(false)
    setTimeout(() => setIsAnimating(true), 10)
  }

  useEffect(() => {
    if (isAnimating) {
      restartAnimation()
    }
  }, [animConfig])

  const PropertyPanel = ({
    title,
    properties
  }: {
    title: string
    properties: Array<{
      label: string
      key: keyof AnimationConfig
      type: 'number' | 'text' | 'select'
      options?: string[]
      min?: number
      max?: number
      step?: number
    }>
  }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-gray-300 text-sm font-semibold mb-3">{title}</h3>
        <div className="grid grid-cols-2 gap-3">
          {properties.map((prop) => (
            <div key={prop.key} className={prop.type === 'select' && prop.options && prop.options.length > 3 ? 'col-span-2' : ''}>
              <label className="block text-xs text-gray-400 mb-1">{prop.label}</label>
              {prop.type === 'number' && (
                <input
                  type="number"
                  min={prop.min}
                  max={prop.max}
                  step={prop.step || 1}
                  value={animConfig[prop.key] as number}
                  onChange={(e) => updateAnimConfig(prop.key, parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'text' && (
                <input
                  type="text"
                  value={animConfig[prop.key] as string}
                  onChange={(e) => updateAnimConfig(prop.key, e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'select' && (
                <select
                  value={animConfig[prop.key] as string}
                  onChange={(e) => updateAnimConfig(prop.key, e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                >
                  {prop.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <style jsx>{`
        ${getKeyframes(animConfig.animationType)}
      `}</style>
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Animation Tool
        </h2>

        {/* 설명 섹션 - 항상 표시 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">CSS 애니메이션 생성</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">애니메이션 타입</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Fade, Slide, Scale, Rotate</span> 등 다양한 애니메이션 타입을 선택하고
                  <span className="text-yellow-400">Duration, Delay</span>로 타이밍을 조절합니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">타이밍 함수</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Easing</span> 함수로 애니메이션의 가속/감속을 제어하고,
                  <span className="text-yellow-400">Iteration</span>으로 반복 횟수를 설정합니다.
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                <strong className="text-white">핵심 원리:</strong> CSS @keyframes를 활용하여 요소의 상태 변화를 부드럽게 표현합니다. 다양한 타이밍 함수와 반복 옵션으로 원하는 애니메이션 효과를 구현할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 애니메이션 타입 */}
            <PropertyPanel
              title="애니메이션 타입"
              properties={[
                { 
                  label: 'Animation Type', 
                  key: 'animationType', 
                  type: 'select',
                  options: ['fadeIn', 'fadeOut', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideInDown', 'scaleIn', 'scaleOut', 'rotate', 'bounce', 'pulse', 'shake']
                }
              ]}
            />

            {/* 타이밍 설정 */}
            <PropertyPanel
              title="타이밍 설정"
              properties={[
                { label: 'Duration (초)', key: 'duration', type: 'number', min: 0.1, max: 10, step: 0.1 },
                { label: 'Delay (초)', key: 'delay', type: 'number', min: 0, max: 5, step: 0.1 },
                { 
                  label: 'Timing Function', 
                  key: 'timingFunction', 
                  type: 'select',
                  options: ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)']
                }
              ]}
            />

            {/* 반복 및 방향 */}
            <PropertyPanel
              title="반복 및 방향"
              properties={[
                { 
                  label: 'Iteration Count', 
                  key: 'iterationCount', 
                  type: 'select',
                  options: ['1', '2', '3', '5', '10', 'infinite']
                },
                { 
                  label: 'Direction', 
                  key: 'direction', 
                  type: 'select',
                  options: ['normal', 'reverse', 'alternate', 'alternate-reverse']
                },
                { 
                  label: 'Fill Mode', 
                  key: 'fillMode', 
                  type: 'select',
                  options: ['none', 'forwards', 'backwards', 'both']
                },
                { 
                  label: 'Play State', 
                  key: 'playState', 
                  type: 'select',
                  options: ['running', 'paused']
                }
              ]}
            />

            {/* 리셋 버튼 */}
            <button
              onClick={resetAnimConfig}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              초기화
            </button>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className="w-full">
            <div className="w-full">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white text-lg font-semibold">실시간 미리보기</h4>
                  <button
                    onClick={restartAnimation}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                  >
                    재생
                  </button>
                </div>
                <p className="text-gray-400 text-sm">설정한 값이 실시간으로 반영됩니다</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-8 w-full min-h-[400px] flex items-center justify-center">
                <div
                  className="bg-indigo-600 rounded-lg p-8 w-48 h-48 flex items-center justify-center transition-all"
                  style={isAnimating ? getAnimationStyle() : {}}
                >
                  <div className="text-center text-white">
                    <p className="text-lg font-semibold mb-2">Animation</p>
                    <p className="text-sm text-indigo-200">미리보기</p>
                  </div>
                </div>
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setAnimConfig({
                        animationType: 'fadeIn',
                        duration: 1,
                        delay: 0,
                        timingFunction: 'ease',
                        iterationCount: '1',
                        direction: 'normal',
                        fillMode: 'both',
                        playState: 'running'
                      })
                      restartAnimation()
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">페이드 인</p>
                        <p className="text-sm text-indigo-200">부드러운 나타남 효과</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setAnimConfig({
                        animationType: 'bounce',
                        duration: 1,
                        delay: 0,
                        timingFunction: 'ease-in-out',
                        iterationCount: 'infinite',
                        direction: 'normal',
                        fillMode: 'both',
                        playState: 'running'
                      })
                      restartAnimation()
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">바운스</p>
                        <p className="text-sm text-indigo-200">무한 반복 바운스 효과</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 표시 - 버튼 바로 위 */}
        <div className="max-w-7xl mx-auto px-5 mt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">CSS 코드</h4>
                <button
                  onClick={() => copyCSSToClipboard(getCSSCode())}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedCSS ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{getCSSCode()}</code>
              </pre>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">Tailwind CSS (인라인 스타일)</h4>
                <button
                  onClick={() => copyTailwindToClipboard(getTailwindCode())}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedTailwind ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{getTailwindCode()}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="max-w-4xl mx-auto mb-24 flex justify-center">
          <button
            onClick={() => { 
              setShowCode(true)
              setCopiedModalCSS(false)
              setCopiedModalTailwind(false)
            }}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            완료 및 코드 확인
          </button>
        </div>

        {/* Final Code Modal */}
        {showCode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-white text-xl font-semibold">생성된 코드</h3>
                <button
                  onClick={() => setShowCode(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">CSS 코드</h4>
                    <button
                      onClick={() => copyModalCSSToClipboard(getCSSCode())}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalCSS ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <pre className="bg-gray-900 rounded p-4 text-xs text-gray-300 overflow-x-auto">
                    <code>{getCSSCode()}</code>
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Tailwind CSS (인라인 스타일)</h4>
                    <button
                      onClick={() => copyModalTailwindToClipboard(getTailwindCode())}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalTailwind ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <pre className="bg-gray-900 rounded p-4 text-xs text-gray-300 overflow-x-auto">
                    <code>{getTailwindCode()}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

