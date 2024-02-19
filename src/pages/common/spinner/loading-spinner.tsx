import { CSSProperties } from 'react'

import PacmanLoader from 'react-spinners/PacmanLoader'

const loadingOverride: CSSProperties = {
  display: 'block',
  margin: '15% auto',
}

export const LoadingSpinner = () => {
  return (
    <PacmanLoader
      aria-label={'Loading Spinner'}
      color={'#8c61ff'}
      cssOverride={loadingOverride}
      size={50}
    />
  )
}
