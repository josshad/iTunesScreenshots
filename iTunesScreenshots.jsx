#target photoshop

function main(){
	app.preferences.rulerUnits = Units.PIXELS ; 
  app.preferences.typeUnits = TypeUnits.PIXELS ;   
    
  if(!documents.length) return;
  var doc = activeDocument;
   var oldPath = activeDocument.path;
   
  var outFolder = new Folder(oldPath + "/out");
  if (!outFolder.exists) 
  {
      outFolder.create();
  }
  var h = 0;
  var w = 0;
 
  var heights = [2208,1334,1136,960];
  var widths = [1242,750,640,640];

  var names = ["IPhone 6 Plus.jpg","IPhone 6.jpg","IPhone 5.jpg","IPhone 4.jpg"];
  srcDoc = app.activeDocument;
  var selectedLayer = srcDoc.activeLayer;
	if (selectedLayer)
	{

	}
	else 
	{
		alert('No layer selected');
		return;
	}

	var amActionDesc = new ActionDescriptor();
  var amActionRef = new ActionReference();
  amActionRef.putClass(charIDToTypeID('Dcmn'));
  amActionDesc.putReference(charIDToTypeID('null'), amActionRef);
  amActionDesc.putString(charIDToTypeID('Nm  '), selectedLayer.name);
  var amActionRefDup = new ActionReference();
  amActionRefDup.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
  amActionDesc.putReference(charIDToTypeID('Usng'), amActionRefDup);
  executeAction(charIDToTypeID('Mk  '), amActionDesc, DialogModes.NO);

  var layerRef = app.activeDocument.artLayers.add()


  layerRef.name = "temp"
  layerRef.blendMode = BlendMode.NORMAL
  var id1435 = charIDToTypeID( "MrgV" );
  executeAction( id1435, undefined, DialogModes.NO );
  var prevHeight = 0;
  var prevWidth = 0;
  var sF = "/" + selectedLayer.name;
  var saveFolder = new Folder(outFolder + sF);
  if (!saveFolder.exists) 
  {
    saveFolder.create();
  }
  for (i = 0; i < 4; i++)
  {
    var w = widths[i];
    var h = heights[i];
    if (w == prevWidth && h != prevHeight)
    {
      app.activeDocument.resizeCanvas(w, h, AnchorPosition.TOPLEFT);  
    }
    else
    {
      app.activeDocument.resizeImage(w, h, 72, ResampleMethod.BICUBIC);     
    }
    var saveName = "/"+ names[i];
    var saveFile= File(saveFolder + saveName);
    SaveForWeb(saveFile,80);  
    prevWidth = w;
    prevHeight = h;
  }

  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
  app.activeDocument = srcDoc;
  alert('Complete!');

 }

function SaveForWeb(saveFile,jpegQuality) {
    var sfwOptions = new ExportOptionsSaveForWeb(); 
   sfwOptions.format = SaveDocumentType.JPEG; 
   sfwOptions.includeProfile = false; 
   sfwOptions.interlaced = 0; 
   sfwOptions.optimized = true; 
   sfwOptions.quality = jpegQuality; //0-100 
    activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);
}

main();

