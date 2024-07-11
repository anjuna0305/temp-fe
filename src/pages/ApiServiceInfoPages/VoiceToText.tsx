import MinimulNavbar from '../../components/MinimulNavbar'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getServiceByServiceId } from '../../Api/ApiService'
import { ApiServiceData } from '../../Api/Interfaces'

const VoiceToText = () => {
    const [isService, setIsService] = useState<boolean>(true)
    const [serviceInfo, setServiceInfo] = useState<ApiServiceData>({} as ApiServiceData)

    useEffect(() => {
        // const rightSection = document.getElementById("right-section")
        // rightSection?.addEventListener("scroll", () => {

        // })
        const loadApiserviceData = async (id: number) => {
            const service = await getServiceByServiceId(id)
            if (!service) {
                setIsService(false)
            }
            else {
                setIsService(true)
                setServiceInfo(service)
            }
        }
        loadApiserviceData(1)

    }, [])

    return (
        <>
            <MinimulNavbar />
            <div className='container'>
                <div className="row">
                    <div className='col-3 d-flex flex-column border p-3 py-3 apiInfoPage-height' id='left-section'>
                        <div>
                            <small className='link' style={{ cursor: "pointer" }} onClick={() => { window.history.go(-1) }}> ⬅ Back</small>
                        </div>
                        <h5 className='pt-5'>On this page</h5>

                        <ul className='p-4 pt-3 d-grid gap-2 overflowY-auto'>
                            <li className='link-secondary' role='button'>this is it</li>
                            <li className='link-secondary' role='button'>this is it</li>
                            <li className='link-primary' role='button'>this is it</li>
                        </ul>

                        <div className="pt-3 d-grid mt-auto">
                            <Link to={"request-access"} className='btn btn-primary' role='button'>Apply for access</Link>
                            {/* <button className='btn btn-primary'>Apply for access</button> */}
                        </div>
                    </div>

                    <div className='col border border-start-0 px-4 overflowY-auto apiInfoPage-height' id='right-section'>
                        <section className='pt-4'>
                            <h2>Subasa Voice to Text</h2>
                            <p>You can test subasa {serviceInfo.name}. Visit <a href="http://stt.subasa.lk">stt.subasa.lk↗</a></p>
                            <Link to={"request-access"} className='btn btn-primary btn-sm' role='button'>Apply for access</Link>
                        </section>


                        <section className='pt-4'>
                            <h2>Introduction</h2>
                            <p>Welcome to the documentation for integrating our Speech-to-Text (STT) application endpoint into your website. This endpoint allows you to convert spoken language into written text, enabling seamless interaction with your users through voice commands and audio input.</p>
                        </section>

                        <section className='pt-4'>
                            <h2>Endpoint URL</h2>
                            <p>The Speech-to-Text endpoint URL is:</p>
                            <code>https://your-api-endpoint.com/speech-to-text</code>
                        </section>

                        <section className='pt-4'>
                            <h2>Supported Methods</h2>
                            <p>POST: Used for sending audio data to the endpoint for transcription.</p>
                        </section>

                        <section className='pt-4'>
                            <h2>Authentication</h2>
                            <p>Authentication is required to access the Speech-to-Text endpoint. Please refer to your API documentation for details on how to authenticate requests.</p>
                        </section>

                        <section className='pt-4'>
                            <h2>Request Format</h2>
                            <p>POST requests to the endpoint should include:</p>
                            <ul>
                                <li><strong>Headers:</strong>
                                    <ul>
                                        <li><code>Content-Type: audio/{'{'}audio_format{'}'}</code> (e.g., <code>audio/wav</code>, <code>audio/mp3</code>)</li>
                                        <li>Authentication headers as specified in your API documentation.</li>
                                    </ul>
                                </li>
                                <li><strong>Body:</strong> Binary audio data in the specified format (<code>wav</code>, <code>mp3</code>, etc.).</li>
                            </ul>
                        </section>

                        <section className='pt-4'>
                            <h2>Response Format</h2>
                            <p>The endpoint responds with a JSON object containing the transcription of the audio data:</p>
                            <pre><code>{`{
  "transcription": "The transcribed text of the speech."
}`}</code></pre>
                        </section>

                        <section className='pt-4'>
                            <h2>Example Usage</h2>
                            <h3>JavaScript Example:</h3>
                            <pre><code>{`<script>
const fileInput = document.getElementById('audioFile');

fileInput.addEventListener('change', async function() {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('audio', file);

  try {
    const response = await fetch('https://your-api-endpoint.com/speech-to-text', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'audio/wav'
      },
      body: formData
    });

    const data = await response.json();
    console.log('Transcription:', data.transcription);
  } catch (error) {
    console.error('Error:', error);
  }
});
</script>`}</code></pre>
                        </section>

                        <section className='pt-4'>
                            <h2>Error Handling</h2>
                            <ul>
                                <li><strong>4xx Errors:</strong> Invalid requests or authentication issues.</li>
                                <li><strong>5xx Errors:</strong> Server-side issues.</li>
                            </ul>
                        </section>

                        <section className='pt-4'>
                            <h2>Notes</h2>
                            <ul>
                                <li>Ensure that the audio data is within the supported formats (<code>wav</code>, <code>mp3</code>, etc.).</li>
                                <li>Handle errors gracefully in your application to provide a smooth user experience.</li>
                            </ul>
                        </section>

                        <section className='pt-4'>
                            <h2>Support</h2>
                            <p>For any questions or issues regarding the Speech-to-Text endpoint integration, please contact our support team at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.</p>
                        </section>

                    </div>

                </div>
            </div>
        </>
    )
}

export default VoiceToText
