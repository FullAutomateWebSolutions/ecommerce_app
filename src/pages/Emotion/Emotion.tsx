import EmotionalForm from '@/components/form/EmotionalForm'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { PageActions } from '@/components/layout/PageActions'


const Emotion = () => {
  return (
    <div>
      <BaseLayout 
        title={'Emotion'} 
        actions={<>
        <PageActions 
        onRefresh={()=>console.log()}
        />
        </>}
        subTitle='Gestao das minhas emoções'
        breadcrumb={["Emotion","Adminstração de emoções"]}
        children={<EmotionalForm/>}
         />
      
    </div>
  )
}

export default Emotion
