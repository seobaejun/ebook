'use client'

import { useState } from 'react'

interface ColorStop {
  color: string
  position: number
}

export function GradientGenerator() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear')
  const [angle, setAngle] = useState(90)
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#3B82F6', position: 0 },
    { color: '#8B5CF6', position: 100 }
  ])

  const addColorStop = () => {
    const newPosition = colorStops.length > 0 
      ? Math.min(100, colorStops[colorStops.length - 1].position + 20)
      : 50
    setColorStops([...colorStops, { color: '#10B981', position: newPosition }])
  }

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index))
    }
  }

  const updateColorStop = (index: number, key: keyof ColorStop, value: string | number) => {
    const updated = [...colorStops]
    updated[index] = { ...updated[index], [key]: value }
    updated.sort((a, b) => a.position - b.position)
    setColorStops(updated)
  }

  const getGradientStyle = () => {
    const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')
    
    if (gradientType === 'linear') {
      return {
        background: `linear-gradient(${angle}deg, ${stops})`
      }
    } else if (gradientType === 'radial') {
      return {
        background: `radial-gradient(circle, ${stops})`
      }
    } else {
      return {
        background: `conic-gradient(from ${angle}deg, ${stops})`
      }
    }
  }

  const getCSSCode = () => {
    const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')
    
    if (gradientType === 'linear') {
      return `background: linear-gradient(${angle}deg, ${stops});`
    } else if (gradientType === 'radial') {
      return `background: radial-gradient(circle, ${stops});`
    } else {
      return `background: conic-gradient(from ${angle}deg, ${stops});`
    }
  }

  const getTailwindCode = () => {
    const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')
    
    if (gradientType === 'linear') {
      return `style={{ background: 'linear-gradient(${angle}deg, ${stops})' }}`
    } else if (gradientType === 'radial') {
      return `style={{ background: 'radial-gradient(circle, ${stops})' }}`
    } else {
      return `style={{ background: 'conic-gradient(from ${angle}deg, ${stops})' }}`
    }
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

  const resetGradient = () => {
    setGradientType('linear')
    setAngle(90)
    setColorStops([
      { color: '#3B82F6', position: 0 },
      { color: '#8B5CF6', position: 100 }
    ])
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Gradient Generator
        </h2>

        {/* 설명 섹션 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">그라데이션 생성</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">그라데이션 타입</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Linear</span> (선형), <span className="text-yellow-400">Radial</span> (원형), 
                  <span className="text-yellow-400">Conic</span> (원뿔형) 그라데이션을 선택할 수 있습니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">색상 중지점</h4>
                <p className="text-xs leading-relaxed">
                  여러 색상을 추가하고 각 색상의 <span className="text-yellow-400">위치</span>를 조절하여
                  원하는 그라데이션을 만들 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 그라데이션 타입 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">그라데이션 타입</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setGradientType('linear')}
                  className={`px-4 py-2 rounded transition-colors ${
                    gradientType === 'linear'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setGradientType('radial')}
                  className={`px-4 py-2 rounded transition-colors ${
                    gradientType === 'radial'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Radial
                </button>
                <button
                  onClick={() => setGradientType('conic')}
                  className={`px-4 py-2 rounded transition-colors ${
                    gradientType === 'conic'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Conic
                </button>
              </div>
            </div>

            {/* 각도 설정 (Linear, Conic) */}
            {(gradientType === 'linear' || gradientType === 'conic') && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-gray-300 text-sm font-semibold mb-3">각도</h3>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0°</span>
                  <span className="text-white font-semibold">{angle}°</span>
                  <span>360°</span>
                </div>
              </div>
            )}

            {/* 색상 중지점 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-300 text-sm font-semibold">색상 중지점</h3>
                <button
                  onClick={addColorStop}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded transition-colors"
                >
                  + 추가
                </button>
              </div>
              <div className="space-y-3">
                {colorStops.map((stop, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={stop.color}
                      onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                      className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateColorStop(index, 'position', parseInt(e.target.value) || 0)}
                      className="w-16 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                    />
                    <span className="text-gray-400 text-xs">%</span>
                    {colorStops.length > 2 && (
                      <button
                        onClick={() => removeColorStop(index)}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 리셋 버튼 */}
            <button
              onClick={resetGradient}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              초기화
            </button>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className="w-full">
            <div className="w-full">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <h4 className="text-white text-lg font-semibold mb-2">실시간 미리보기</h4>
                <p className="text-gray-400 text-sm">설정한 값이 실시간으로 반영됩니다</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-8 w-full min-h-[400px] flex items-center justify-center">
                <div
                  className="w-full h-64 rounded-lg transition-all"
                  style={getGradientStyle()}
                />
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setGradientType('linear')
                      setAngle(90)
                      setColorStops([
                        { color: '#667EEA', position: 0 },
                        { color: '#764BA2', position: 100 }
                      ])
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">보라색 그라데이션</p>
                        <p className="text-sm text-indigo-200">클래식한 보라색 조합</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setGradientType('linear')
                      setAngle(135)
                      setColorStops([
                        { color: '#F093FB', position: 0 },
                        { color: '#F5576C', position: 100 }
                      ])
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">핑크-레드 그라데이션</p>
                        <p className="text-sm text-indigo-200">따뜻한 색상 조합</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 표시 */}
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

