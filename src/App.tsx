import { useState, useEffect, useRef } from 'react'
import './App.css'
import { load } from '@2gis/mapgl'

function App() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [showInvitation, setShowInvitation] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)

  const openEnvelope = () => {
    const envelope = document.querySelector('.envelope') as HTMLElement
    if (envelope) {
      // Добавляем класс для анимации открытия
      envelope.classList.add('open')
      
      // Добавляем класс для открытия клапана после небольшой задержки
      setTimeout(() => {
        envelope.classList.add('flap-open')
        
        setTimeout(() => {
          setShowInvitation(true)
          setTimeout(() => {
            setAnimateContent(true)
          }, 500)
        }, 1500)
      }, 100)
    }
  }

  useEffect(() => {
    let map: any;
    let marker: any = null;
    
    if (animateContent) {
      const initMap = async () => {
        try {
          const mapglAPI = await load();
          
          if (mapContainer.current) {
            // Координаты ресторана "Старый капитан"
            const restaurantCoordinates: [number, number] = [131.918391, 43.129411];
            
            // Создаем карту с заданными параметрами
            map = new mapglAPI.Map(mapContainer.current, {
              center: restaurantCoordinates,
              zoom: 19,
              key: 'a2dd806e-4e68-4e36-912e-999bf2dea309' // API ключ 2GIS
            });
            
            // Создаем HTML для маркера
            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
           
            
            // Создаем иконку маркера-пина со смайликом на верхушке
            const emojiIcon = `
            <svg fill="#0066ff" width="60" height="90" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <!-- Маркер -->
              <path d="M956.952 0c-362.4 0-657 294.6-657 656.88 0 180.6 80.28 347.88 245.4 511.56 239.76 237.96 351.6 457.68 351.6 691.56v60h120v-60c0-232.8 110.28-446.16 357.6-691.44 165.12-163.8 245.4-331.08 245.4-511.68 0-362.28-294.6-656.88-663-656.88" fill-rule="evenodd"/>
              
              <!-- Круг для смайлика -->
              <circle cx="960" cy="650" r="550" fill="white" />
              
              <!-- Смайлик -->
              <text x="960" y="750" font-size="700" text-anchor="middle" alignment-baseline="middle">🥳</text>
            </svg>`;
            
            // Конвертируем SVG в data URL
            const svgBlob = new Blob([emojiIcon], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
            
            // Добавляем маркер на карту
            marker = new mapglAPI.Marker(map, {
              coordinates: restaurantCoordinates,
              icon: url,
              size: [60, 90],
              anchor: [30, 80] // устанавливаем якорь на нижней части маркера
            });
            
            // Добавляем обработчик для зоома карты, чтобы скорректировать маркер при необходимости
            map.on('zoom', () => {
              // Возвращаемся к координатам маркера
              marker.setCoordinates(restaurantCoordinates);
            });
            
            // Добавляем в CSS новую анимацию пульсации
            const styleElement = document.createElement('style');
            styleElement.textContent = `
              @keyframes pulse {
                0% { transform: scale(0.8); opacity: 0.7; }
                50% { transform: scale(1.2); opacity: 0.9; }
                100% { transform: scale(0.8); opacity: 0.7; }
              }
            `;
            document.head.appendChild(styleElement);
            
            // Добавляем маркер ресторана с текстовой меткой
            markerElement.style.position = 'absolute';
            markerElement.style.left = '-15px';
            markerElement.style.top = '-15px';
            mapContainer.current.appendChild(markerElement);
          }
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      };
      
      initMap();
    }

    return () => {
      // Очистка всех ресурсов при размонтировании компонента
      if (marker) {
        marker.destroy();
        const emojiIcon = `
            <svg fill="#0066ff" width="60" height="90" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <!-- Маркер -->
              <path d="M956.952 0c-362.4 0-657 294.6-657 656.88 0 180.6 80.28 347.88 245.4 511.56 239.76 237.96 351.6 457.68 351.6 691.56v60h120v-60c0-232.8 110.28-446.16 357.6-691.44 165.12-163.8 245.4-331.08 245.4-511.68 0-362.28-294.6-656.88-663-656.88" fill-rule="evenodd"/>
              
              <!-- Круг для смайлика -->
              <circle cx="960" cy="650" r="550" fill="white" />
              
              <!-- Смайлик -->
              <text x="960" y="750" font-size="700" text-anchor="middle" alignment-baseline="middle">🥳</text>
            </svg>`;
            
            // Конвертируем SVG в data URL
            const svgBlob = new Blob([emojiIcon], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
        // Освобождаем URL объект
        const blobUrl = url;
        if (typeof blobUrl === 'string') {
          URL.revokeObjectURL(blobUrl);
        }
      }
      
      if (map) {
        map.destroy();
      }
      
      // Удаляем добавленные элементы
      const customMarker = document.querySelector('.custom-marker');
      if (customMarker) {
        customMarker.remove();
      }
    };
  
  }, [animateContent]);

  if (!showInvitation) {
    return (
      <div className="main-container">
        <div className="envelope-wrapper">
          <div className="envelope" onClick={openEnvelope}>
            <div className="envelope-front">
              <div className="stamp">
                <span>🥳</span>
              </div>
              <div className="address">
                <br></br>
                <br></br>
                <br></br>
                <p>Приглашение</p>
              </div>
              <div className="instruction">
                <span>Нажмите, чтобы открыть</span>
              </div>
              <div className="pull-tab">
                <div className="pull-arrow"></div>
              </div>
            </div>
            <div className="envelope-flap"></div>
            <div className="envelope-pocket"></div>
            <div className="letter">
              <div className="letter-content"><h2>50 <br></br></h2>
              <p>  ~~~~~~  </p>
              <p>  ~~~~~~~~~ ~~~~~~~~~~  </p>
              <p>~~~ ~~~~~ ~~~ ~~ ~~~~~</p>
              <p>~~~~~~~ ~~~~~ ~~ ~~~~~ ~~</p>
              <p>~~ ~~~~~~~~ ~~~ ~~~~</p>
              <p>~~~~</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`invitation-container ${animateContent ? 'fade-in' : ''}`}>
      <div className="vintage-border">
        <div className="invitation-card animate-elements">
          <div className="ornament top"></div>
          
          <div className="header">
            <div className="event-type">ЮБИЛЕЙНОЕ ТОРЖЕСТВО</div>
            <div className="divider"></div>
            <div className="age-container">
              <div className="age">50</div>
              <div className="years">ЛЕТ</div>
            </div>
            <h1 className="name">ИГОРЬ КОСЬЯНЕНКО</h1>
          </div>
          
          <div className="invitation-content">
            <div className="invitation-text">с честью приглашает Вас разделить радость особенного события</div>
            <div className="details">
              <div className="detail-item">
                <div className="detail-label">ДАТА</div>
                <div className="detail-value">22 ноября 2025</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">ВРЕМЯ</div>
                <div className="detail-value">18:00</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">МЕСТО</div>
                <div className="detail-value">Ресторан "Старый капитан"</div>
                <div className="address">ул. Народный проспект, д. 28</div>
              </div>
            </div>
          </div>

          <div className="map-container">
            <div ref={mapContainer} className="map"></div>
          </div>

          <div className="rsvp">
            <div className="rsvp-text">Подтвердите, пожалуйста, Ваше присутствие до 10 октября</div>
            <div className="rsvp-contact">+7 (999) 123-45-67</div>
          </div>
          
          <div className="ornament bottom"></div>
        </div>
      </div>
    </div>
  )
}

export default App
