import { useEffect } from "react";
import { BsCursor, BsHeadset, BsShieldCheck, BsTruck } from "react-icons/bs";
import "./footer.css";

export default function Footer() {
  useEffect(() => {
    let tekrar =
      document.body.offsetWidth / document.getElementById("footerTekrarla").offsetWidth;
    for (let i = 0; i < Math.ceil(tekrar); i++) {
      let sp = document.createElement("span");
      let sp2 = document.createElement("span");
      let sp3 = document.createElement("span");
      sp.innerHTML = " ne ararsan buradan alırsın";
      sp2.innerHTML = " ne ararsan buradan alırsın";
      sp3.innerHTML = " ne ararsan buradan alırsın";
      document.getElementById("footerSlogan").appendChild(sp);
      document.getElementById("footerSlogan2").appendChild(sp2);
      document.getElementById("footerSlogan3").appendChild(sp3);
    }
  }, []);

  useEffect(() => {
    Array.from(document.getElementsByClassName("uyar")).forEach((element) => {
      element.addEventListener("click",() => {
        alert("Bu site gerçek bir alışveriş sitesi değildir. Furkan Doğan tarafından oluşturulmuş bir projedir.")
      })
    })
  },[])

  return (
    <footer>
      <div className="container">
        <div id="footerTop">
          <div className="footerTop">
            <BsCursor /> <p>Tek tıkla ihtiyacın olan her şeyi satın al</p>
          </div>
          <div className="footerTop">
            <BsShieldCheck />{" "}
            <p>3D Secure teknolojisiyle, güvenle ödemeni gerçekleştir</p>
          </div>
          <div className="footerTop">
            <BsTruck /> <p>Hızlı ve ücretsiz kargoyla ürünün kapına gelsin</p>
          </div>
          <div className="footerTop">
            <BsHeadset />{" "}
            <p>Her probleminde 7 Gün 24 Saat çağrı merkezimize ulaşabilirsin</p>
          </div>
        </div>
      </div>

      <section id="footerSlogan" className="footerSlogan">
        <span id="footerTekrarla">ne alırsan buradan alırsın</span>
      </section>
      <section id="footerSlogan2" className="footerSlogan">
        <span>san buradan alırsın</span>
      </section>
      <section id="footerSlogan3" className="footerSlogan">
        <span>alırsın</span>
      </section>

      <div className="container">
        <nav id="footerNav">
          <div className="footerNavColumn">
            <h3>Kurumsal</h3>
            <ul>
              <li className="uyar">Hakkımızda</li>
              <li className="uyar">Vizyon & Misyon</li>
              <li className="uyar">Tarihçe</li>
              <li className="uyar">Yönetim</li>
              <li className="uyar">İletişim</li>
              <li className="uyar">Kariyer</li>
            </ul>
          </div>
          <div className="footerNavColumn">
            <h3>Satıcılar</h3>
            <ul>
              <li className="uyar">Satıcı Hizmetleri</li>
              <li className="uyar">Nasıl Satıcı Olurum?</li>
              <li className="uyar">Satıcı Kurallarımız</li>
              <li className="uyar">Satıcı Şikayetleri</li>
            </ul>
          </div>
          <div className="footerNavColumn">
            <h3>Yasal</h3>
            <ul>
              <li className="uyar">Kişisel Verileriniz</li>
              <li className="uyar">Bilgi Güvenliği Politikası</li>
              <li className="uyar">Bilgi Toplumu Hizmetleri</li>
              <li className="uyar">İş Güvenliği Politikamız</li>
              <li className="uyar">Kullanım Koşulları</li>
            </ul>
          </div>
          <div className="footerNavColumn">
            <h3>Bizi Takip Edin</h3>
            <ul>
              <li className="uyar">Instagram</li>
              <li className="uyar">Facebook</li>
              <li className="uyar">Twitter</li>
              <li className="uyar">Youtube</li>
              <li className="uyar">Linkedin</li>
              <li className="uyar">Tiktok</li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="copyright">&copy; 2024 alırsın.com
      <div>
        <a href="https://github.com/doganfurkan" target="_blank" rel="noopener noreferrer">Furkan Doğan</a>
      </div>
      
      </div>
    </footer>
  );
}
