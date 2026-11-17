import { useNavigate, useParams, Navigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Phone,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Scale,
  Gavel,
  Building2,
  ExternalLink,
} from "lucide-react";

const modulos = [
  {
    id: "phishing",
    titulo: "Phishing",
    subtitulo: "Engaños mediante correos y mensajes",
    icono: Mail,
    color: "blue",
    introduccion:
      "El phishing es una técnica de ingeniería social en la que un atacante suplanta a una persona, empresa o entidad de confianza para engañar a una víctima y conseguir información confidencial, dinero o acceso a sus cuentas.",
    senales: [
      "Mensajes que generan urgencia o amenazan con bloquear una cuenta.",
      "Enlaces que conducen a páginas web desconocidas.",
      "Remitentes con direcciones extrañas o que imitan empresas conocidas.",
      "Solicitudes inesperadas de contraseñas o datos bancarios.",
      "Archivos adjuntos que no esperabas recibir.",
    ],
    prevencion: [
      "Verificar cuidadosamente la dirección del remitente.",
      "No abrir enlaces ni archivos adjuntos sospechosos.",
      "Acceder a los servicios escribiendo su dirección oficial.",
      "Utilizar contraseñas diferentes y autenticación multifactor.",
      "Reportar los mensajes sospechosos al responsable de la empresa.",
    ],
    respuesta: [
      "No interactuar con el mensaje sospechoso.",
      "Informar al responsable de tecnología o seguridad.",
      "Si ingresaste una contraseña, cambiarla desde el sitio oficial y desde un dispositivo seguro.",
      "Revisar la actividad de las cuentas afectadas y cerrar sesiones desconocidas.",
      "Contactar al banco si hubo operaciones financieras sospechosas.",
      "Conservar el mensaje, los enlaces y las capturas como evidencia.",
    ],
    riesgos: [
      {
        titulo: "Robo de información",
        descripcion:
          "Los atacantes pueden obtener contraseñas, datos bancarios, documentos y datos personales de empleados o clientes.",
      },
      {
        titulo: "Pérdidas económicas",
        descripcion:
          "Pueden producirse transferencias fraudulentas, pagos a cuentas falsas o compras no autorizadas.",
      },
      {
        titulo: "Suplantación de identidad",
        descripcion:
          "Los delincuentes pueden utilizar cuentas o información de empleados y propietarios para engañar a otras personas.",
      },
      {
        titulo: "Infección con software malicioso",
        descripcion:
          "Un archivo adjunto o enlace puede facilitar la instalación de programas dañinos, incluido ransomware.",
      },
      {
        titulo: "Daño reputacional",
        descripcion:
          "La exposición de información puede afectar la confianza de clientes, proveedores y trabajadores.",
      },
      {
        titulo: "Interrupción de actividades",
        descripcion:
          "El acceso no autorizado o el bloqueo de sistemas puede impedir que la empresa realice sus actividades normales.",
      },
    ],
    delitos: [
      {
        articulo: "Artículo 269A",
        nombre: "Acceso abusivo a un sistema informático",
        descripcion:
          "Puede configurarse cuando el atacante utiliza las credenciales obtenidas para ingresar sin autorización a cuentas, plataformas o sistemas de la empresa.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269F",
        nombre: "Violación de datos personales",
        descripcion:
          "Puede aplicarse cuando se obtienen, sustraen, divulgan o utilizan datos personales sin estar facultado para hacerlo y con los elementos exigidos por la norma.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269G",
        nombre: "Suplantación de sitios web para capturar datos personales",
        descripcion:
          "Se relaciona directamente con páginas, enlaces o ventanas falsas creadas para engañar a las personas y capturar sus datos.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269I",
        nombre: "Hurto por medios informáticos y semejantes",
        descripcion:
          "Puede presentarse cuando se utilizan medios informáticos o la suplantación de usuarios para apropiarse de bienes o dinero de otra persona.",
        sancion:
          "Remite a las penas previstas en el artículo 240 del Código Penal.",
      },
      {
        articulo: "Artículo 269J",
        nombre: "Transferencia no consentida de activos",
        descripcion:
          "Puede configurarse cuando, mediante manipulación informática o artificio semejante y con ánimo de lucro, se consigue transferir dinero o activos sin consentimiento y en perjuicio de otra persona.",
        sancion:
          "Prisión de 48 a 120 meses y multa de 200 a 1.500 salarios mínimos legales mensuales vigentes.",
      },
    ],
    normativa: [
      {
        nombre: "Ley 1273 de 2009",
        descripcion:
          "Modifica el Código Penal colombiano e incorpora delitos relacionados con la protección de la información y los datos.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=34492",
      },
      {
        nombre: "Ley 1581 de 2012",
        descripcion:
          "Establece disposiciones generales para la protección de datos personales y los deberes de quienes los recolectan y utilizan.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981",
      },
    ],
    ejemplo:
      "Una pequeña empresa recibe un correo que aparenta ser de su banco. El mensaje advierte que la cuenta será bloqueada y solicita ingresar a un enlace para confirmar los datos. El enlace conduce a una página falsa diseñada para robar las credenciales.",
  },

  {
    id: "vishing",
    titulo: "Vishing",
    subtitulo: "Engaños mediante llamadas telefónicas",
    icono: Phone,
    color: "purple",
    introduccion:
      "El vishing es una modalidad de ingeniería social que utiliza llamadas telefónicas o mensajes de voz para hacerse pasar por entidades bancarias, empresas, proveedores, funcionarios o personas de confianza. Su objetivo es engañar a las víctimas para obtener información confidencial, dinero o acceso a cuentas y sistemas informáticos.",
    senales: [
      "Llamadas inesperadas que exigen actuar inmediatamente.",
      "Personas que solicitan contraseñas, códigos de verificación o datos bancarios.",
      "Supuestos asesores bancarios que informan sobre movimientos sospechosos.",
      "Llamadas que amenazan con bloquear cuentas o suspender servicios.",
      "Personas que solicitan instalar aplicaciones o permitir acceso remoto al equipo.",
      "Números telefónicos que aparentan pertenecer a entidades conocidas.",
      "Solicitudes de transferencias para supuestamente proteger el dinero.",
    ],
    prevencion: [
      "Nunca compartir contraseñas ni códigos de autenticación por teléfono.",
      "Verificar la identidad de quien llama utilizando los números oficiales de la entidad.",
      "No realizar transferencias por instrucciones de llamadas inesperadas.",
      "No instalar aplicaciones ni permitir acceso remoto a desconocidos.",
      "Establecer procedimientos internos para autorizar pagos y transferencias.",
      "Capacitar a los empleados para reconocer llamadas fraudulentas.",
      "Evitar divulgar información interna de la empresa a personas no verificadas.",
    ],
    respuesta: [
      "Finalizar inmediatamente la llamada si existen señales de engaño.",
      "No proporcionar información adicional ni realizar transferencias.",
      "Contactar a la entidad mediante sus canales oficiales.",
      "Informar al responsable de tecnología o administración de la empresa.",
      "Si se compartieron contraseñas, cambiarlas desde un dispositivo seguro.",
      "Contactar al banco si se realizaron operaciones sospechosas.",
      "Conservar números telefónicos, mensajes, fechas y demás evidencias.",
      "Denunciar los hechos ante las autoridades competentes cuando corresponda.",
    ],
    riesgos: [
      {
        titulo: "Robo de información confidencial",
        descripcion:
          "Los delincuentes pueden obtener contraseñas, códigos de verificación, datos bancarios e información empresarial mediante engaños telefónicos.",
      },
      {
        titulo: "Fraudes financieros",
        descripcion:
          "Un empleado puede ser convencido de realizar transferencias a cuentas controladas por delincuentes o revelar información que facilite operaciones fraudulentas.",
      },
      {
        titulo: "Suplantación de identidad",
        descripcion:
          "Los atacantes pueden hacerse pasar por propietarios, administradores, proveedores o empleados para engañar a otras personas.",
      },
      {
        titulo: "Acceso no autorizado a sistemas",
        descripcion:
          "La información obtenida durante una llamada puede utilizarse para ingresar a correos electrónicos, plataformas empresariales y cuentas personales.",
      },
      {
        titulo: "Pérdida de confianza",
        descripcion:
          "Un incidente puede afectar la relación de la PYME con sus clientes, proveedores y trabajadores.",
      },
      {
        titulo: "Interrupción de las actividades",
        descripcion:
          "El compromiso de cuentas empresariales puede provocar pérdida de información y dificultades para continuar las operaciones.",
      },
    ],
    delitos: [
      {
        articulo: "Artículo 246",
        nombre: "Estafa",
        descripcion:
          "Puede configurarse cuando el delincuente utiliza engaños telefónicos para inducir a una persona a entregar dinero o realizar una operación, obteniendo un provecho ilícito y causando un perjuicio ajeno.",
        sancion:
          "La sanción debe determinarse conforme al texto vigente del artículo 246 y las circunstancias del caso.",
      },
      {
        articulo: "Artículo 269A",
        nombre: "Acceso abusivo a un sistema informático",
        descripcion:
          "Puede configurarse cuando el atacante utiliza información obtenida mediante una llamada para ingresar sin autorización a cuentas o sistemas informáticos.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269F",
        nombre: "Violación de datos personales",
        descripcion:
          "Puede aplicarse cuando se obtienen, sustraen, divulgan o utilizan datos personales sin estar facultado para hacerlo y se cumplen los elementos establecidos por la ley.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269J",
        nombre: "Transferencia no consentida de activos",
        descripcion:
          "Puede configurarse cuando, mediante manipulación informática o artificio semejante, se consigue una transferencia de dinero o activos sin consentimiento y en perjuicio de otra persona.",
        sancion:
          "Prisión de 48 a 120 meses y multa de 200 a 1.500 salarios mínimos legales mensuales vigentes.",
      },
    ],
    normativa: [
      {
        nombre: "Ley 599 de 2000 - Código Penal",
        descripcion:
          "Contiene el delito de estafa en el artículo 246 y otras conductas contra el patrimonio económico. Puede aplicarse cuando el engaño telefónico produce un perjuicio económico y se cumplen sus elementos.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6388",
      },
      {
        nombre: "Ley 1273 de 2009",
        descripcion:
          "Incorpora al Código Penal delitos relacionados con la protección de la información y los datos, como el acceso abusivo y las transferencias no consentidas de activos.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=34492",
      },
      {
        nombre: "Ley 1581 de 2012",
        descripcion:
          "Establece disposiciones generales para la protección de datos personales y las obligaciones relacionadas con su tratamiento.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981",
      },
    ],
    ejemplo:
      "Un empleado de una PYME recibe una llamada de una persona que se identifica como asesor de su banco. El supuesto asesor informa que existe una transferencia sospechosa y solicita un código recibido por mensaje de texto para cancelar la operación. Si el empleado comparte el código, el delincuente podría utilizarlo para intentar acceder a la cuenta o autorizar una operación. La actuación correcta es finalizar la llamada y comunicarse directamente con el banco mediante sus canales oficiales.",
  },

  {
    id: "ransomware",
    titulo: "Ransomware",
    subtitulo: "Secuestro de información digital",
    icono: LockKeyhole,
    color: "red",
    introduccion:
      "El ransomware es un tipo de software malicioso que bloquea o cifra archivos y sistemas informáticos para impedir que sus propietarios accedan a ellos. Los atacantes suelen exigir dinero a cambio de una supuesta recuperación de la información. También pueden amenazar con publicar los datos robados. Este ataque representa un riesgo importante para las PYMES, porque puede comprometer su información, sus recursos económicos y la continuidad de sus actividades.",
    senales: [
      "Archivos que no pueden abrirse o aparecen con extensiones desconocidas.",
      "Mensajes que exigen dinero para recuperar el acceso a la información.",
      "Pantallas que muestran instrucciones de pago o amenazas de publicar datos.",
      "Archivos y carpetas que desaparecen, cambian de nombre o se modifican.",
      "Actividad inusual en los equipos y sistemas de la empresa.",
      "Alertas de seguridad o detecciones de programas maliciosos.",
      "Imposibilidad de acceder a documentos, bases de datos o sistemas empresariales.",
    ],
    prevencion: [
      "Realizar copias de seguridad periódicas y mantener al menos una copia desconectada o protegida contra modificaciones.",
      "Comprobar periódicamente que las copias de seguridad puedan recuperarse.",
      "Mantener actualizados los sistemas operativos y programas.",
      "Utilizar antivirus y herramientas de protección confiables.",
      "No abrir archivos adjuntos ni enlaces de remitentes desconocidos.",
      "Limitar los permisos de acceso de los empleados según sus funciones.",
      "Utilizar contraseñas seguras y autenticación multifactor.",
      "Capacitar al personal para reconocer correos y archivos sospechosos.",
      "Evitar utilizar cuentas con permisos de administrador para actividades cotidianas.",
    ],
    respuesta: [
      "Desconectar inmediatamente el equipo afectado de la red y del Wi-Fi para evitar la propagación.",
      "Informar al responsable de tecnología o seguridad de la empresa.",
      "No borrar archivos ni formatear equipos antes de preservar las evidencias.",
      "No conectar discos externos ni copias de seguridad al equipo infectado.",
      "Conservar mensajes de extorsión, capturas, registros y demás evidencias.",
      "Solicitar apoyo de personal especializado para analizar el incidente.",
      "Cambiar las credenciales comprometidas desde un dispositivo seguro.",
      "Identificar los equipos y sistemas afectados.",
      "Recuperar la información desde copias de seguridad verificadas y equipos limpios.",
      "No pagar el rescate como respuesta automática: el pago no garantiza recuperar los archivos ni evita nuevas extorsiones.",
    ],
    riesgos: [
      {
        titulo: "Pérdida de información empresarial",
        descripcion:
          "Los atacantes pueden cifrar, eliminar o impedir el acceso a documentos, bases de datos, facturas, registros contables e información de clientes.",
      },
      {
        titulo: "Pérdidas económicas",
        descripcion:
          "La empresa puede sufrir gastos de recuperación, interrupción de ventas, contratación de especialistas y posibles exigencias de dinero por parte de los delincuentes.",
      },
      {
        titulo: "Interrupción de las operaciones",
        descripcion:
          "La imposibilidad de utilizar equipos, sistemas de facturación o bases de datos puede detener las actividades comerciales y administrativas.",
      },
      {
        titulo: "Exposición de datos personales",
        descripcion:
          "Algunos atacantes también roban información antes de cifrarla y amenazan con divulgar datos de empleados, clientes y proveedores.",
      },
      {
        titulo: "Extorsión y amenazas",
        descripcion:
          "Los delincuentes pueden exigir pagos a cambio de entregar claves de recuperación o no publicar la información sustraída.",
      },
      {
        titulo: "Daño reputacional y pérdida de confianza",
        descripcion:
          "La exposición de información o la interrupción de servicios puede afectar la imagen de la empresa y sus relaciones comerciales.",
      },
      {
        titulo: "Afectación de copias de seguridad",
        descripcion:
          "Si las copias están conectadas permanentemente a la red, también pueden resultar cifradas o eliminadas durante el ataque.",
      },
    ],
    delitos: [
      {
        articulo: "Artículo 269D",
        nombre: "Daño informático",
        descripcion:
          "Puede configurarse cuando el atacante destruye, daña, borra, deteriora, altera o suprime datos informáticos o componentes de un sistema sin estar autorizado.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269E",
        nombre: "Uso de software malicioso",
        descripcion:
          "Puede aplicarse a quienes, sin estar autorizados, producen, distribuyen, venden, envían o introducen programas informáticos de efectos dañinos. Se relaciona con la creación y distribución de ransomware.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269B",
        nombre: "Obstaculización ilegítima de sistema informático",
        descripcion:
          "Puede configurarse cuando se impide u obstaculiza sin autorización el funcionamiento o el acceso normal a sistemas informáticos, redes o datos.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes, siempre que la conducta no constituya un delito con pena mayor.",
      },
      {
        articulo: "Artículo 269A",
        nombre: "Acceso abusivo a un sistema informático",
        descripcion:
          "Puede presentarse cuando los atacantes ingresan sin autorización a los sistemas de la empresa para instalar ransomware, obtener información o realizar otras actividades ilícitas.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 269F",
        nombre: "Violación de datos personales",
        descripcion:
          "Puede configurarse cuando los delincuentes obtienen, sustraen, divulgan o utilizan datos personales sin estar facultados para hacerlo y con los elementos exigidos por la norma.",
        sancion:
          "Prisión de 48 a 96 meses y multa de 100 a 1.000 salarios mínimos legales mensuales vigentes.",
      },
      {
        articulo: "Artículo 244",
        nombre: "Extorsión",
        descripcion:
          "Puede configurarse cuando el atacante obliga a una persona o empresa, mediante amenazas o presión, a realizar, tolerar u omitir algo con el propósito de obtener un provecho ilícito.",
        sancion:
          "Prisión de 8 a 15 años, conforme al artículo 244 del Código Penal, sin perjuicio de las circunstancias de agravación que puedan aplicar.",
      },
    ],
    normativa: [
      {
        nombre: "Ley 1273 de 2009",
        descripcion:
          "Incorpora al Código Penal colombiano delitos relacionados con la protección de la información y los datos. Incluye conductas como daño informático, uso de software malicioso, acceso abusivo y obstaculización de sistemas.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=34492",
      },
      {
        nombre: "Ley 1581 de 2012",
        descripcion:
          "Establece disposiciones generales para la protección de datos personales. Es relevante cuando un incidente de ransomware compromete información de empleados, clientes o proveedores.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981",
      },
      {
        nombre: "Ley 599 de 2000 - Código Penal",
        descripcion:
          "Contiene disposiciones sobre delitos contra el patrimonio económico, incluida la extorsión en su artículo 244.",
        url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6388",
      },
    ],
    ejemplo:
      "Una microempresa recibe un correo que aparenta contener una factura de uno de sus proveedores. Un empleado abre el archivo adjunto y, posteriormente, varios documentos administrativos dejan de estar disponibles. En la pantalla aparece un mensaje que exige dinero para recuperar los archivos y amenaza con publicar información de la empresa. La empresa debe desconectar los equipos afectados, conservar las evidencias, informar al responsable de tecnología y buscar apoyo especializado para contener el incidente y recuperar la información mediante copias de seguridad verificadas.",
  },
];

export default function Modulos() {
  const { id } = useParams();
  const navigate = useNavigate();

  const modulo = modulos.find((m) => m.id === id);

  if (!modulo) {
    return <Navigate to="/dashboard" replace />;
  }

  const Icono = modulo.icono;
 const siguienteModulo = () => {
  if (id === "phishing") {
    navigate("/evaluacion-modulo/phishing");
  } else if (id === "vishing") {
    navigate("/evaluacion-modulo/vishing");
  } else if (id === "ransomware") {
    navigate("/evaluacion-modulo/ransomware");
  }
};

  return (
    <main className="modulos-page">
      <div className="modulos-wrapper">
        <button
          className="modulos-back"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft size={19} />
          Volver al panel
        </button>

        <section className={`modulo-detalle ${modulo.color}`}>
          <div className="modulo-icono">
            <Icono size={34} />
          </div>

          <span className="modulos-etiqueta">MÓDULO EDUCATIVO</span>

          <h1>{modulo.titulo}</h1>

          <p className="modulo-subtitulo">{modulo.subtitulo}</p>

          <div className="modulo-seccion">
            <h2>
              <BookOpen size={21} />
              ¿Qué es?
            </h2>
            <p>{modulo.introduccion}</p>
          </div>

          <div className="modulo-seccion">
            <h2>
              <AlertTriangle size={21} />
              Señales de alerta
            </h2>
            <ul>
              {modulo.senales.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="modulo-seccion">
            <h2>
              <ShieldCheck size={21} />
              ¿Cómo prevenirlo?
            </h2>
            <ul>
              {modulo.prevencion.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="modulo-seccion">
            <h2>
              <CheckCircle2 size={21} />
              ¿Qué hacer ante un ataque?
            </h2>
            <ul>
              {modulo.respuesta.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {modulo.riesgos && (
            <div className="modulo-seccion">
              <h2>
                <AlertTriangle size={21} />
                Riesgos para las personas y las PYMES
              </h2>

              {modulo.riesgos.map((riesgo, i) => (
                <div key={i}>
                  <h3>{riesgo.titulo}</h3>
                  <p>{riesgo.descripcion}</p>
                </div>
              ))}
            </div>
          )}

          {modulo.delitos && (
            <div className="modulo-seccion">
              <h2>
                <Gavel size={21} />
                Delitos informáticos en Colombia
              </h2>

              <p>
                Dependiendo de los hechos, este tipo de ataque puede
                estar relacionado con diferentes delitos contemplados
                en el Código Penal colombiano:
              </p>

              {modulo.delitos.map((delito, i) => (
                <div key={i}>
                  <h3>{delito.articulo}</h3>
                  <strong>{delito.nombre}</strong>
                  <p>{delito.descripcion}</p>
                  <p>
                    <strong>Sanción prevista:</strong>{" "}
                    {delito.sancion}
                  </p>
                </div>
              ))}

              <p>
                <strong>Importante:</strong> el phishing, el vishing
                y el ransomware no constituyen automáticamente todos
                estos delitos. La autoridad competente debe analizar
                los hechos y determinar cuáles conductas se configuran
                en cada caso.
              </p>
            </div>
          )}

          {modulo.normativa && (
            <div className="modulo-seccion">
              <h2>
                <Scale size={21} />
                Normativa colombiana relacionada
              </h2>

              {modulo.normativa.map((norma, i) => (
                <div key={i}>
                  <h3>{norma.nombre}</h3>
                  <p>{norma.descripcion}</p>
                  <a
                    href={norma.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar norma oficial
                    <ExternalLink size={15} />
                  </a>
                </div>
              ))}

              <p>
                La Ley 1581 de 2012 es especialmente relevante para
                las PYMES que recolectan, almacenan o utilizan
                información personal de clientes, empleados y
                proveedores.
              </p>
            </div>
          )}

          <div className="modulo-ejemplo">
            <strong>Ejemplo en una PYME</strong>
            <p>{modulo.ejemplo}</p>
          </div>

          {modulo.id === "phishing" && (
            <div className="modulo-seccion">
              <h2>
                <Building2 size={21} />
                ¿Dónde denunciar en Colombia?
              </h2>

              <p>
                Si una persona o empresa es víctima de un posible
                delito informático, puede acudir a la Fiscalía
                General de la Nación y utilizar sus canales oficiales
                de atención y denuncia.
              </p>

              <a
                href="https://www.fiscalia.gov.co/colombia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fiscalía General de la Nación
                <ExternalLink size={15} />
              </a>

              <p>
                También es recomendable contactar al banco cuando
                existan operaciones sospechosas, conservar las
                evidencias e informar al responsable de seguridad
                de la empresa.
              </p>
            </div>
          )}

          {modulo.id === "vishing" && (
            <div className="modulo-seccion">
              <h2>
                <Building2 size={21} />
                ¿Dónde denunciar en Colombia?
              </h2>

              <p>
                Si fuiste víctima de una llamada fraudulenta,
                puedes acudir a la Fiscalía General de la Nación.
                Conserva el número desde el que llamaron, la fecha,
                la hora, los mensajes y los comprobantes de
                operaciones sospechosas.
              </p>

              <a
                href="https://www.fiscalia.gov.co/colombia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fiscalía General de la Nación
                <ExternalLink size={15} />
              </a>

              <p>
                Si entregaste información bancaria o realizaste
                una transferencia, comunícate inmediatamente con
                tu entidad financiera por sus canales oficiales.
              </p>
            </div>
          )}

          {modulo.id === "ransomware" && (
            <div className="modulo-seccion">
              <h2>
                <Building2 size={21} />
                ¿Dónde denunciar en Colombia?
              </h2>

              <p>
                Si una empresa es víctima de un ataque de ransomware,
                puede denunciar los hechos ante la Fiscalía General
                de la Nación. Es importante conservar las evidencias,
                incluyendo mensajes de extorsión, capturas de pantalla,
                registros del incidente y comunicaciones recibidas.
              </p>

              <a
                href="https://www.fiscalia.gov.co/colombia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fiscalía General de la Nación
                <ExternalLink size={15} />
              </a>

              <p>
                También se recomienda informar al responsable de
                tecnología, buscar apoyo especializado y evaluar si
                fueron comprometidos datos personales para determinar
                las obligaciones correspondientes.
              </p>
            </div>
          )}

          <div className="modulo-navegacion">
  <button
    className="modulo-finalizar"
    type="button"
    onClick={siguienteModulo}
  >
    {modulo.id === "ransomware"
      ? "Finalizar módulos"
      : "Siguiente módulo"}
    <ChevronRight size={19} />
  </button>
</div>
        </section>
      </div>
    </main>
  );
}