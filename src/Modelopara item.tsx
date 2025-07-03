// import {
//   query,
//   collection,
//   onSnapshot,
//   addDoc,
//   doc,
//   deleteDoc,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import LeitorPage from "./pages/LeitorPage";

// interface WebBaseData {
//   name: string;
//   id: string;
// }

// const App = () => {
//   const [nomes, setNomes] = useState<WebBaseData[]>([]);
//   const [inputName, setInputName] = useState<string>("");

//   function handleForm(values: string) {
//     setInputName(values);
//     adicionarNome(inputName);
//     setInputName("");
//   }


//     function handleFormSubst(id: string,values: string) {

//     // setInputName(values);
//     // substituirNome(id,inputName);
//     // setInputName("");

//     return <>
    
//       <div>sadasjk</div>
//     </>
//   }



//   useEffect(() => {
//     /// Busca online todas as moficações da collection
//     const q = query(collection(db, "webBase"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-expect-error
//       const dados: WebBaseData[] = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setNomes(dados);
//     });

//     return () => unsubscribe();
//   }, []);


//   const adicionarNome = async (value: string) => {
//     try {
//       await addDoc(collection(db, "webBase"), {
//         name: value,
//       });
//     } catch (e) {
//       console.error("Erro ao adicionar documento:", e);
//     }
//   };

//   const removerNome = async (id: string) => {
//     try {
//       await deleteDoc(doc(db, "webBase", id));
//       console.log("Nome removido com sucesso!");
//     } catch (e) {
//       console.error("Erro ao remover nome:", e);
//     }
//   };

//   // Substitui o documento com um novo conteúdo
//   const substituirNome = async (id: string, novoNome: string) => {
//     try {
//       await setDoc(doc(db, "webBase", id), {
//         name: novoNome,
//         catalogo: 1,
//       });
//       console.log("Documento substituído com sucesso!");
//     } catch (e) {
//       console.error("Erro ao substituir documento:", e);
//     }
//   };

//   // Substitui o documento com um novo conteúdo
//   const substituirTudo = async (id: string, novoNome: string) => {
//     try {
//       await updateDoc(doc(db, "webBase", id), {
//         name: novoNome,
//         catalogo: 1,
//       });
//       console.log("Documento substituído com sucesso!");
//     } catch (e) {
//       console.error("Erro ao substituir documento:", e);
//     }
//   };

//   // useEffect(() => {
//   // const q = query(collection(db, "webBase"));
//   //  onSnapshot(q, (querySnapshot) => {
//   //   return setNomes(
//   //      querySnapshot.docs.map(
//   //        doc => ( doc.data() as WebBaseData)
//   //      ));
//   // });

//   // }, []);

//   return (
//     <div style={{ margin: 50 }}>
//       <LeitorPage/>
//       <h1>Nomes</h1>
//       <h4>Adiconar nome:</h4>
//       <input
//         type="text"
//         title="Adicionar nome:"
//         value={inputName}
//         onChange={(e) => setInputName(e.target.value)}
//       />
//       <button onClick={() => handleForm(inputName)}>Adicionar Nome</button>
//       <br />
//       <h4>Lista de nomes cadastrados</h4>
//       {nomes.map((item) => (
//         <div key={item.id}>
//           <div>
//             <input
//               type="text"
//               value={item.name}
//               onChange={(e) => setInputName(e.target.value)}
//             />
//           </div>

//           <div style={{ marginBottom: 15, initialLetter: 10 }}>
//             <button onClick={() => removerNome(item.id)}>Remover</button>
//             <button onClick={() =>  handleFormSubst(item.id,inputName)}>
//               Substituir
//             </button>
//             <button onClick={() => substituirTudo(item.id, "Atualizado")}>
//               Substituir tudo
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;
