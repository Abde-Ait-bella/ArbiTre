import React, { useEffect } from "react";

export function Header() {
  useEffect(() => {
    const handlePrint = () => {
      const header = document.querySelector(".header");
      const headerClone = header.cloneNode(true);

      document.body.appendChild(headerClone);
    };

    window.addEventListener("beforeprint", handlePrint);

    return () => {
      window.removeEventListener("beforeprint", handlePrint);
    };
  }, []);

  return (
    <>
      <div className="images print-header">
        <img
          className="logoLigue"
          src="../img/image0004.png"
          alt="ligue souss"
        />
        <div className="text-center mb-0">
          <p>الجامعة الملكية المغربية لكرة القدم</p>
          <p>العصبة الجهوية سوس ماسة لكرة القدم</p>
          <p>اللجنة الجهوية للتحكيم - المديرية الجهوية للحكام</p>
        </div>
        <div className="text-center mb-0">
          <p>Fédération royale marocaine de football</p>
          <p>Ligue Régionale de Souss Massa de football</p>
          <p>Comité Régional d'Arbitrage - Direction Régionale de l'Arbitrage</p>
        </div>
        <img className="titleLigue" src="../img/frmf.png" alt="ligue souss" />
      </div>
    
    </>
  );
}
