
import EmotionalForm from '@/components/form/EmotionalForm'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { PageActions } from '@/components/layout/PageActions'
import ModalBase from '@/components/ui/ModalBase'
import { useState } from 'react'

import ChecklistComportamento from '@/components/form/ChecklistComportamento'
import SignalMindList from './SignalMindList'


const SignalMind = () => {
  const [modal, setModal] = useState(false);
  const [modalA, setModalA] = useState(false);
  return (
    <div>
      <BaseLayout 
        title={'Verificação da Mente Sinalizadora'} 
        actions={<>
        <PageActions 
            onCreate={()=>setModalA(true)}
            
            createText='CheckList'
            />
        </>}
        subTitle='Mente através dos sinais, lingua invisivel de sinais humanos'
        breadcrumb={["Signal Mind","CheckList Signal Mind"]}
        children={<>
        <SignalMindList/>
        </>}
         />
         <ModalBase children={<ChecklistComportamento />} onCancel={()=>setModalA(!modalA)} open={modalA}/>
      
      
    </div>
  )
}

export default SignalMind
