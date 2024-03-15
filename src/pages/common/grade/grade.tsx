import { starFullIcon, starIcon } from '@/assets/image'

type GradeProps = {
  grade: number
}
export const Grade = ({ grade }: GradeProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <img alt={'star'} src={grade >= 1 ? starFullIcon : starIcon} />
      <img alt={'star'} src={grade >= 2 ? starFullIcon : starIcon} />
      <img alt={'star'} src={grade >= 3 ? starFullIcon : starIcon} />
      <img alt={'star'} src={grade >= 4 ? starFullIcon : starIcon} />
      <img alt={'star'} src={grade >= 5 ? starFullIcon : starIcon} />
    </div>
  )
}
