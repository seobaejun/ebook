'use client'

import { useState } from 'react'

interface BorderRadiusConfig {
  topLeft: number
  topRight: number
  bottomRight: number
  bottomLeft: number
  uniform: boolean
}

export function BorderRadiusTool() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [radiusConfig, setRadiusConfig] = useState<BorderRadiusConfig>({
    topLeft: 8,
    topRight: 8,
    bottomRight: 8,
    bottomLeft: 8,
    uniform: true
  })

  const updateRadiusConfig = (key: keyof BorderRadiusConfig, value: number | boolean) => {
    if (key === 'uniform' && value === true) {
      const currentValue = radiusConfig.topLeft
      setRadiusConfig({
        topLeft: currentValue,
        topRight: currentValue,
        bottomRight: currentValue,
        bottomLeft: currentValue,
        uniform: true
      })
    } else {
      const newConfig = { ...radiusConfig, [key]: value }
      if (key !== 'uniform' && newConfig.uniform) {
        newConfig.topLeft = value as number
        newConfig.topRight = value as number
        newConfig.bottomRight = value as number
        newConfig.bottomLeft = value as number
      }
      setRadiusConfig(newConfig)
    }
  }

  const resetRadiusConfig = () => {
    setRadiusConfig({
      topLeft: 8,
      topRight: 8,
      bottomRight: 8,
      bottomLeft: 8,
      uniform: true
    })
  }

  const getBorderRadiusStyle = () => {
    if (radiusConfig.topLeft === radiusConfig.topRight && 
        radiusConfig.topRight === radiusConfig.bottomRight && 
        radiusConfig.bottomRight === radiusConfig.bottomLeft) {
      return {
        borderRadius: `${radiusConfig.topLeft}px`
      }
    }
    return {
      borderRadius: `${radiusConfig.topLeft}px ${radiusConfig.topRight}px ${radiusConfig.bottomRight}px ${radiusConfig.bottomLeft}px`
    }
  }

  const getCSSCode = () => {
    if (radiusConfig.topLeft === radiusConfig.topRight && 
        radiusConfig.topRight === radiusConfig.bottomRight && 
        radiusConfig.bottomRight === radiusConfig.bottomLeft) {
      return `border-radius: ${radiusConfig.topLeft}px;`
    }
    return `border-radius: ${radiusConfig.topLeft}px ${radiusConfig.topRight}px ${radiusConfig.bottomRight}px ${radiusConfig.bottomLeft}px;`
  }

  const getTailwindCode = () => {
    if (radiusConfig.topLeft === radiusConfig.topRight && 
        radiusConfig.topRight === radiusConfig.bottomRight && 
        radiusConfig.bottomRight === radiusConfig.bottomLeft) {
      return `style={{ borderRadius: '${radiusConfig.topLeft}px' }}`
    }
    return `style={{ borderRadius: '${radiusConfig.topLeft}px ${radiusConfig.topRight}px ${radiusConfig.bottomRight}px ${radiusConfig.bottomLeft}px' }}`
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

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Border Radius Tool
        </h2>

        {/* 설명 섹션 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">둥근 모서리 설정</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">개별 모서리 조절</h4>
                <p className="text-xs leading-relaxed">
                  각 모서리(<span className="text-yellow-400">Top Left</span>, <span className="text-yellow-400">Top Right</span>,
                  <span className="text-yellow-400">Bottom Right</span>, <span className="text-yellow-400">Bottom Left</span>)를
                  개별적으로 조절할 수 있습니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">균일한 모서리</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Uniform</span> 옵션을 활성화하면
                  모든 모서리를 동일한 값으로 설정할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* Uniform 옵션 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <label className="flex items-center gap-2 text-gray-300 text-sm">
                <input
                  type="checkbox"
                  checked={radiusConfig.uniform}
                  onChange={(e) => updateRadiusConfig('uniform', e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span>Uniform (모든 모서리 동일하게)</span>
              </label>
            </div>

            {/* 모서리 설정 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">모서리 설정</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Top Left (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={radiusConfig.topLeft}
                    onChange={(e) => updateRadiusConfig('topLeft', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                    disabled={radiusConfig.uniform}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Top Right (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={radiusConfig.topRight}
                    onChange={(e) => updateRadiusConfig('topRight', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                    disabled={radiusConfig.uniform}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Bottom Right (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={radiusConfig.bottomRight}
                    onChange={(e) => updateRadiusConfig('bottomRight', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                    disabled={radiusConfig.uniform}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Bottom Left (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={radiusConfig.bottomLeft}
                    onChange={(e) => updateRadiusConfig('bottomLeft', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                    disabled={radiusConfig.uniform}
                  />
                </div>
                {radiusConfig.uniform && (
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Border Radius (px)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={radiusConfig.topLeft}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0
                        updateRadiusConfig('topLeft', value)
                      }}
                      className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 리셋 버튼 */}
            <button
              onClick={resetRadiusConfig}
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
                  className="bg-indigo-600 w-64 h-64 transition-all"
                  style={getBorderRadiusStyle()}
                />
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setRadiusConfig({
                        topLeft: 8,
                        topRight: 8,
                        bottomRight: 8,
                        bottomLeft: 8,
                        uniform: true
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">균일한 모서리</p>
                        <p className="text-sm text-indigo-200">모든 모서리가 동일한 값</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setRadiusConfig({
                        topLeft: 20,
                        topRight: 20,
                        bottomRight: 0,
                        bottomLeft: 0,
                        uniform: false
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">상단만 둥글게</p>
                        <p className="text-sm text-indigo-200">위쪽 모서리만 둥근 효과</p>
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

