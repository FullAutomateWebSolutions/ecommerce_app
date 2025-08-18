import { BaseLayout } from '@/components/layout/BaseLayout'
import React from 'react'
import UserList from './userList'
import { PageActions } from '@/components/layout/PageActions'

const User = () => {
  return (

    
    <div>
       <BaseLayout 
        title={'Gestão de Acessos'} 
     
        subTitle='Adminstração de usuários ativos na plataforma'
        breadcrumb={["Perfil","Gestão de Acessos"]}
        children={<UserList/>}
         />
       
    </div>
  )
}

export default User
