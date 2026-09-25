import urllib.request

# URL directa y activa del endpoint SOAP (NumberConversion)
url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso"

# Estructura del mensaje XML SOAP
xml_payload = """<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>500</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>"""

headers = {
    'Content-Type': 'text/xml; charset=utf-8'
}

print("Enviando petición SOAP al servidor...")

req = urllib.request.Request(url, data=xml_payload.encode('utf-8'), headers=headers, method='POST')

try:
    with urllib.request.urlopen(req) as response:
        print(f"Estado HTTP: {response.getcode()} OK")
        print("\n--- Respuesta del Web Service ---")
        respuesta = response.read().decode('utf-8')
        print(respuesta)
except Exception as e:
    print(f"Error al conectar: {e}")