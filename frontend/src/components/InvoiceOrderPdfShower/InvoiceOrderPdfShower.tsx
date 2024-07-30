import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useState } from 'react';


export function InvoiceOrderPdfShower() {
// pdf file onChange state
const [pdfFile, setPdfFile]=useState<string | ArrayBuffer | null>(null);

// pdf file error state
const [pdfError, setPdfError]=useState('');


// handle file onChange event
const allowedFiles = ['application/pdf'];
const handleFile = (e) =>{
  const selectedFile = e.target.files[0];
  // console.log(selectedFile.type);
  if(selectedFile){
    if(selectedFile&&allowedFiles.includes(selectedFile.type)){
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend=(e)=>{
        setPdfError('');

        const result = e.target.result;
        if (typeof result === 'string') {
          setPdfFile(result);

        } else if (result instanceof ArrayBuffer) {
          setPdfFile(new Uint8Array(result));

        }
      }
    }
    else{
      setPdfError('Not a valid pdf: Please select only PDF');
      setPdfFile('');
    }
  }
  else{
    console.log('please select a PDF');
  }
}

  return (
    <div className="container">

      {/* Upload PDF */}
      <form>

        <label><h5>Upload PDF</h5></label>
        <br></br>

        <input type='file' className="form-control"
        onChange={handleFile}></input>

        {/* we will display error message in case user select some file
        other than pdf */}
        {pdfError&&<span className='text-danger'>{pdfError}</span>}

      </form>

      {/* View PDF */}
      <h5>View PDF</h5>
      <div className="viewer">

        {/* render this if we have a pdf file */}
        {pdfFile&&(
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile as string | Uint8Array}></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!pdfFile&&<>No file is selected yet</>}

      </div>

    </div>
  );
}