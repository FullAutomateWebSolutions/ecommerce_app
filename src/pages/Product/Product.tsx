import { BaseLayout } from "@/components/layout/BaseLayout";
import React, { useState } from "react";
import { ProductMarket } from "./ProductMarket";
import { ProductFormDinamicoObrigatorioMercadoLivre } from "@/pages/MercadoLivre/form/ProductFormDinamicoObrigatorioMercadoLivre";
import ModalBase from "@/components/ui/ModalBase";
import { PageActions } from "@/components/layout/PageActions";
import { ProductFormDinamicoMercadoLivre } from "@/pages/MercadoLivre/form/ProductFormDinamicoMercadoLivre";
import { CategoriaMeliForm } from "@/pages/MercadoLivre/form/AtributosCategoriaMercadoLivreRequestForm";
import { FormularioCategorias } from "@/pages/MercadoLivre/form/AtributosCategoriaMercadoLivreManualForm";
import { ProductFormMercadoLivreSimples } from "@/pages/MercadoLivre/form/ProductFormSimplesMercadoLivre";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };


  function handleSubmit(formData: any) {
    console.log("Dados do formulário para enviar ao backend:", formData);
    // Aqui você pode montar o payload completo e chamar seu backend para publicar
  }

   const handleCategoriaSelecionada = (categoria: { id: string; name: string }) => {
    setSelected(categoria.id)
    console.log('Selecionado:', categoria.id, categoria.name);
    // aqui você pode atualizar estado, fazer chamada, etc
  };
  return (


    <div>
      <BaseLayout
        title={"Gestão de Produto"}
        subTitle="Adminstração , cadastro, edição, manutenção"
        breadcrumb={["Cadastro", "Gestão de Produto"]}
        actions={
          <>
            <PageActions
              createText="Nova Produto Mercado Livre"
              onCreate={() => setIsModalOpen(true)}
            />
          </>
        }
        children={<></>}
      />

      <ModalBase
        // title="Adiconar Loja"
        open={isModalOpen}
        onCancel={handleCloseModal}

        // onOk={() => updateUser(formData)}
        // okText="Salvar"
        // confirmLoading={isSaving}
        // width={isMobile ? "90%" : 600}
        // centered
      >
          <h2>Selecionar Categoria</h2>
        <FormularioCategorias onCategoriaSelecionada={handleCategoriaSelecionada} />
        
        {selected && (
             <ProductFormDinamicoObrigatorioMercadoLivre   categoryId={selected} onSubmit={(e)=>handleSubmit(e)}/>
            // <ProductFormDinamicoMercadoLivre  categoryId={selected} />
        //  <ProductFormMercadoLivreSimples categoryId={selected} onSubmit={(e)=>handleSubmit(e)}/>
        
        )}
      
       
        
      </ModalBase>
    </div>
  );
};

export default Product;
