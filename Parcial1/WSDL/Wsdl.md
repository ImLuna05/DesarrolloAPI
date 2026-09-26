# Estructura de un archivo WSDL (Web Service Description Language)

Un archivo **WSDL** es un documento basado en **XML** que se utiliza para describir un Web Service basado en **SOAP** (Simple Object Access Protocol). Funciona como un "contrato" que especifica qué operaciones realiza el servicio, qué parámetros recibe, qué devuelve y cómo comunicarse con él.

---

## 1. Estructura General de un WSDL

La estructura jerárquica de un documento WSDL consta de un elemento raíz `<definitions>` que envuelve varios componentes principales (tanto abstractos como concretos):

```xml
<definitions name="NombreServicio"
             targetNamespace="[http://ejemplo.com/wsdl/NombreServicio.wsdl](http://ejemplo.com/wsdl/NombreServicio.wsdl)"
             xmlns="[http://schemas.xmlsoap.org/wsdl/](http://schemas.xmlsoap.org/wsdl/)"
             xmlns:tns="[http://ejemplo.com/wsdl/NombreServicio.wsdl](http://ejemplo.com/wsdl/NombreServicio.wsdl)"
             xmlns:xsd="[http://www.w3.org/2001/XMLSchema](http://www.w3.org/2001/XMLSchema)"
             xmlns:soap="[http://schemas.xmlsoap.org/wsdl/soap/](http://schemas.xmlsoap.org/wsdl/soap/)">

    <!-- 1. TIPOS (Types): Definición de tipos de datos XML Schema -->
    <types>
       <xsd:schema targetNamespace="[http://ejemplo.com/wsdl/NombreServicio.wsdl](http://ejemplo.com/wsdl/NombreServicio.wsdl)">
           <!-- Declaración de elementos y tipos de datos complejos -->
       </xsd:schema>
    </types>

    <!-- 2. MENSAJES (Message): Datos que se intercambian (parámetros de entrada/salida) -->
    <message name="NombreOperacionRequest">
        <part name="parametros" element="tns:ElementoEntrada"/>
    </message>
    <message name="NombreOperacionResponse">
        <part name="resultado" element="tns:ElementoSalida"/>
    </message>

    <!-- 3. PUERTO TIPO / INTERFAZ (PortType): Operaciones disponibles en el servicio -->
    <portType name="NombreServicioPortType">
        <operation name="NombreOperacion">
            <input message="tns:NombreOperacionRequest"/>
            <output message="tns:NombreOperacionResponse"/>
        </operation>
    </portType>

    <!-- 4. ENLACE / BINDING: Protocolo y formato de datos (ej. SOAP sobre HTTP) -->
    <binding name="NombreServicioBinding" type="tns:NombreServicioPortType">
        <soap:binding style="document" transport="[http://schemas.xmlsoap.org/soap/http](http://schemas.xmlsoap.org/soap/http)"/>
        <operation name="NombreOperacion">
            <soap:operation soapAction="[http://ejemplo.com/NombreOperacion](http://ejemplo.com/NombreOperacion)"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>

    <!-- 5. SERVICIO (Service): Dirección física (URL) del endpoint del Web Service -->
    <service name="NombreServicioService">
        <port name="NombreServicioPort" binding="tns:NombreServicioBinding">
            <soap:address location="http://localhost:8080/ws/NombreServicio"/>
        </port>
    </service>

</definitions>