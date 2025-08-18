import EmotionalForm from '@/components/form/EmotionalForm'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { PageActions } from '@/components/layout/PageActions'
import ModalBase from '@/components/ui/ModalBase'
import { useState } from 'react'
import EmotionList from './EmotionList'


const Emotion = () => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <BaseLayout 
        title={'Emotion'} 
        actions={<>
        <PageActions 
        onCreate={()=>setModal(true)}
        />
        </>}
        subTitle='Gestao das minhas emoções'
        breadcrumb={["Emotion","Adminstração de emoções"]}
        children={<EmotionList/>}
         />
         <ModalBase
        children={<EmotionalForm />} onCancel={()=>setModal(!modal)} open={modal}/>
      
    </div>
  )
}

export default Emotion
