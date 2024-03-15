import { CSSProperties } from 'react'
import { BarLoader } from 'react-spinners'

type SpinnerProps = {
  isMain?: boolean
  isProfile?: boolean
  loading?: boolean
}
export const FetchingSpinner = ({ isMain = false, isProfile = false, loading }: SpinnerProps) => {
  const marginTop = isMain ? '-2.062rem' : ''
  const left = isProfile ? '0' : '-8.562rem'
  const top = isProfile ? '3.75rem' : ''
  const override: CSSProperties = {
    backgroundColor: '#bea6ff',
    borderColor: '#8c61ff',
    marginLeft: left,
    marginTop: marginTop,
    position: 'absolute',
    top: top,
    width: '100%',
  }

  return (
    <BarLoader
      aria-label={'Loading Spinner'}
      color={'#8c61ff'}
      cssOverride={override}
      height={4}
      loading={loading}
      speedMultiplier={1}
    />
  )
}
