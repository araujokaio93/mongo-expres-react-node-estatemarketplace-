import React from 'react';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-red-800">Sobre a Imobiliária Real</h1>
      <p className="mb-6 text-lg text-black text-justify" style={{ textIndent: '1.5em' }}>
        A Imobiliária Real é uma plataforma de marketplace dedicada ao setor imobiliário, construída com a stack MERN (MongoDB, Express.js, React.js e Node.js). Nosso objetivo é facilitar a busca e a negociação de imóveis, proporcionando uma experiência ágil, intuitiva e eficiente tanto para compradores quanto para vendedores.
      </p>
      <h2 className="text-3xl font-semibold ml-5 mb-7 mt-5 text-red-800">Tecnologias utilizadas:</h2>
      <ul className="list-disc list-inside mb-5 text-lg text-black space-y-4 text-justify">
        <li className="flex items-start">
          <SiMongodb style={{ fontSize: '1.5em', marginRight: '0.5em', color: '#47A248' }} />
          <span className="ml-2">
            <strong className="text-red-800"> - MongoDB:</strong> Utilizado como nosso banco de dados NoSQL, MongoDB oferece a flexibilidade necessária para armazenar informações complexas sobre imóveis, usuários e transações.
          </span>
        </li>
        <li className="flex items-start">
          <SiExpress style={{ fontSize: '1.5em', marginRight: '0.5em', color: '#000000' }} />
          <span className="ml-2">
            <strong className="text-red-800"> - Express.js:</strong> Este framework de backend em Node.js permite a criação de uma API robusta e segura, garantindo que todas as operações de busca, cadastro e atualização de imóveis sejam rápidas e confiáveis.
          </span>
        </li>
        <li className="flex items-start">
          <SiReact style={{ fontSize: '1.5em', marginRight: '0.5em', color: '#61DAFB' }} />
          <span className="ml-2">
            <strong className="text-red-800"> - React.js:</strong> No frontend, React.js possibilita a construção de uma interface de usuário dinâmica e responsiva, proporcionando uma navegação suave e uma experiência de usuário agradável.
          </span>
        </li>
        <li className="flex items-start">
          <SiNodedotjs style={{ fontSize: '1.5em', marginRight: '0.5em', color: '#339933' }} />
          <span className="ml-2">
            <strong className="text-red-800"> - Node.js:</strong> No backend, Node.js facilita o processamento assíncrono, permitindo que nossa aplicação gerencie múltiplas requisições de forma eficiente.
          </span>
        </li>
      </ul>
      <p className="text-lg font-semibold text-center text-black mt-6">
  Desenvolvido por Kaio Lázaro Silva de Araújo, estudante do curso de Engenharia da Computação IFMG - Campus Bambuí.
      </p>
    </div>
  );
}
