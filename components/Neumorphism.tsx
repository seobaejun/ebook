'use client'

import { useState } from 'react'

interface NeumorphismConfig {
  backgroundColor: string
  borderRadius: number
  shadowDistance: number
  shadowBlur: number
  lightShadowColor: string
  lightShadowOpacity: number
  darkShadowColor: string
  darkShadowOpacity: number
  inset: boolean
}

export function Neumorphism() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [neuConfig, setNeuConfig] = useState<NeumorphismConfig>({
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    shadowDistance: 10,
    shadowBlur: 20,
    lightShadowColor: '#FFFFFF',
    lightShadowOpacity: 100,
    darkShadowColor: '#BEBEBE',
    darkShadowOpacity: 100,
    inset: false
  })

  const updateNeuConfig = (key: keyof NeumorphismConfig, value: number | string | boolean) => {
    setNeuConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetNeuConfig = () => {
    setNeuConfig({
      backgroundColor: '#E0E0E0',
      borderRadius: 20,
      shadowDistance: 10,
      shadowBlur: 20,
      lightShadowColor: '#FFFFFF',
      lightShadowOpacity: 100,
      darkShadowColor: '#BEBEBE',
      darkShadowOpacity: 100,
      inset: false
    })
  }

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
  }

  const getNeumorphismStyle = () => {
    const lightShadow = `${-neuConfig.shadowDistance}px ${-neuConfig.shadowDistance}px ${neuConfig.shadowBlur}px ${hexToRgba(neuConfig.lightShadowColor, neuConfig.lightShadowOpacity)}`
    const darkShadow = `${neuConfig.shadowDistance}px ${neuConfig.shadowDistance}px ${neuConfig.shadowBlur}px ${hexToRgba(neuConfig.darkShadowColor, neuConfig.darkShadowOpacity)}`
    
    if (neuConfig.inset) {
      return {
        background: neuConfig.backgroundColor,
        borderRadius: `${neuConfig.borderRadius}px`,
        boxShadow: `inset ${lightShadow}, inset ${darkShadow}`
      }
    } else {
      return {
        background: neuConfig.backgroundColor,
        borderRadius: `${neuConfig.borderRadius}px`,
        boxShadow: `${lightShadow}, ${darkShadow}`
      }
    }
  }

  const getCSSCode = () => {
    const lightShadow = `${-neuConfig.shadowDistance}px ${-neuConfig.shadowDistance}px ${neuConfig.shadowBlur}px ${hexToRgba(neuConfig.lightShadowColor, neuConfig.lightShadowOpacity)}`
    const darkShadow = `${neuConfig.shadowDistance}px ${neuConfig.shadowDistance}px ${neuConfig.shadowBlur}px ${hexToRgba(neuConfig.darkShadowColor, neuConfig.darkShadowOpacity)}`
    
    if (neuConfig.inset) {
      return `background: ${neuConfig.backgroundColor};
border-radius: ${neuConfig.borderRadius}px;
box-shadow: inset ${lightShadow}, inset ${darkShadow};`
    } else {
      return `background: ${neuConfig.backgroundColor};
border-radius: ${neuConfig.borderRadius}px;
box-shadow: ${lightShadow}, ${darkShadow};`
    }
  }

  const getTailwindCode = () => {
    const lightShadow = `${-neuConfig.shadowDistance}px ${-neuConfig.shadowDistance}px ${neuConfig.shadowBlur}px ${hexToRgba(neuConfig.lightShadowColor, neuConfig.lightShadowOpacity)}`
    const darkShadow = `${neuConfig.shadowDistance}px ${neuConfig.shadowDistance}px ${neuConfig.shadowBlur}px ${hexToRgba(neuConfig.darkShadowColor, neuConfig.darkShadowOpacity)}`
    
    if (neuConfig.inset) {
      return `style={{
  background: '${neuConfig.backgroundColor}',
  borderRadius: '${neuConfig.borderRadius}px',
  boxShadow: 'inset ${lightShadow}, inset ${darkShadow}'
}}`
    } else {
      return `style={{
  background: '${neuConfig.backgroundColor}',
  borderRadius: '${neuConfig.borderRadius}px',
  boxShadow: '${lightShadow}, ${darkShadow}'
}}`
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

  const PropertyPanel = ({
    title,
    properties
  }: {
    title: string
    properties: Array<{
      label: string
      key: keyof NeumorphismConfig
      type: 'number' | 'text' | 'color' | 'checkbox'
      min?: number
      max?: number
    }>
  }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-gray-300 text-sm font-semibold mb-3">{title}</h3>
        <div className="grid grid-cols-2 gap-3">
          {properties.map((prop) => (
            <div key={prop.key} className={prop.type === 'checkbox' ? 'col-span-2' : ''}>
              <label className="block text-xs text-gray-400 mb-1">{prop.label}</label>
              {prop.type === 'number' && (
                <input
                  type="number"
                  min={prop.min}
                  max={prop.max}
                  value={neuConfig[prop.key] as number}
                  onChange={(e) => updateNeuConfig(prop.key, parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'text' && (
                <input
                  type="text"
                  value={neuConfig[prop.key] as string}
                  onChange={(e) => updateNeuConfig(prop.key, e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'color' && (
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={neuConfig[prop.key] as string}
                    onChange={(e) => updateNeuConfig(prop.key, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={neuConfig[prop.key] as string}
                    onChange={(e) => updateNeuConfig(prop.key, e.target.value)}
                    className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                  />
                </div>
              )}
              {prop.type === 'checkbox' && (
                <label className="flex items-center gap-2 text-gray-300 text-sm">
                  <input
                    type="checkbox"
                    checked={neuConfig[prop.key] as boolean}
                    onChange={(e) => updateNeuConfig(prop.key, e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span>Inset 효과 활성화</span>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Neumorphism
        </h2>

        {/* 설명 섹션 - 항상 표시 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">뉴모피즘 효과 구현</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">Outset 효과</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">밝은 그림자</span>와 <span className="text-yellow-400">어두운 그림자</span>를 조합하여
                  요소가 배경에서 <span className="text-yellow-400">튀어나온</span> 효과를 구현합니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">Inset 효과</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Inset</span> 옵션을 활성화하면 요소가 배경에
                  <span className="text-yellow-400">들어간</span> 효과를 구현합니다.
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                <strong className="text-white">핵심 원리:</strong> 배경색과 유사한 색상의 밝은 그림자와 어두운 그림자를 조합하여 부드럽고 입체적인 효과를 만듭니다. 단일 광원을 가정하여 빛을 받는 면은 밝게, 받지 않는 면은 어둡게 표현합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 기본 설정 섹션 */}
            <PropertyPanel
              title="기본 설정"
              properties={[
                { label: 'Background Color', key: 'backgroundColor', type: 'color' },
                { label: 'Border Radius (px)', key: 'borderRadius', type: 'number', min: 0, max: 50 },
                { label: 'Inset', key: 'inset', type: 'checkbox' }
              ]}
            />

            {/* 그림자 거리 및 블러 */}
            <PropertyPanel
              title="그림자 설정"
              properties={[
                { label: 'Shadow Distance (px)', key: 'shadowDistance', type: 'number', min: 0, max: 30 },
                { label: 'Shadow Blur (px)', key: 'shadowBlur', type: 'number', min: 0, max: 50 }
              ]}
            />

            {/* 밝은 그림자 */}
            <PropertyPanel
              title="밝은 그림자 (Light Shadow)"
              properties={[
                { label: 'Light Shadow Color', key: 'lightShadowColor', type: 'color' },
                { label: 'Light Shadow Opacity (%)', key: 'lightShadowOpacity', type: 'number', min: 0, max: 100 }
              ]}
            />

            {/* 어두운 그림자 */}
            <PropertyPanel
              title="어두운 그림자 (Dark Shadow)"
              properties={[
                { label: 'Dark Shadow Color', key: 'darkShadowColor', type: 'color' },
                { label: 'Dark Shadow Opacity (%)', key: 'darkShadowOpacity', type: 'number', min: 0, max: 100 }
              ]}
            />

            {/* 리셋 버튼 */}
            <button
              onClick={resetNeuConfig}
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
              
              <div 
                className="rounded-lg p-8 w-full min-h-[400px] flex items-center justify-center transition-all"
                style={{ backgroundColor: neuConfig.backgroundColor }}
              >
                <div
                  className="transition-all p-8 w-full max-w-sm"
                  style={getNeumorphismStyle()}
                >
                  <div className="text-center" style={{ color: neuConfig.backgroundColor === '#E0E0E0' ? '#333' : '#FFF' }}>
                    <p className="text-lg font-semibold mb-2">Neumorphism Preview</p>
                    <p className="text-sm opacity-80">뉴모피즘 효과를 확인하세요</p>
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
                      setNeuConfig({
                        backgroundColor: '#E0E0E0',
                        borderRadius: 20,
                        shadowDistance: 10,
                        shadowBlur: 20,
                        lightShadowColor: '#FFFFFF',
                        lightShadowOpacity: 100,
                        darkShadowColor: '#BEBEBE',
                        darkShadowOpacity: 100,
                        inset: false
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">Outset 효과</p>
                        <p className="text-sm text-indigo-200">튀어나온 느낌의 뉴모피즘</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setNeuConfig({
                        backgroundColor: '#E0E0E0',
                        borderRadius: 20,
                        shadowDistance: 10,
                        shadowBlur: 20,
                        lightShadowColor: '#FFFFFF',
                        lightShadowOpacity: 100,
                        darkShadowColor: '#BEBEBE',
                        darkShadowOpacity: 100,
                        inset: true
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">Inset 효과</p>
                        <p className="text-sm text-indigo-200">들어간 느낌의 뉴모피즘</p>
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

