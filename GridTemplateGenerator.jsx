// Copyright 2010-2015 i-designer.net.  All rights reserved.
// This script will generator file with guide for 960.gs
// Written by Nguyen Nhu Tuan
// Created at: 2010-08-25
// Updated at: 2015-06-04
// Email: tuanquynh0508@gmail.com
// Using function guideLine and clearGuides of Patrick. Thanks Patrick !. Ref: http://www.ps-scripts.com/bb/viewtopic.php?t=1775&highlight=&sid=9980aca4225b16adf2b0543df74aa975
// Using function StrToIntWithDefault of Adobe Systems. Thanks Adobe Systems !.

/*
@@@BUILDINFO@@@ GridTemplateGenerator.jsx 1.0.0.1
*/

/*

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/GridTemplateGenerator/Menu=Grid Template Generator...</name>
<about>$$$/JavaScripts/GridTemplateGenerator/About=Grid Template Generator ^r^rCopyright 2010-2015 i-designer.net. All rights reserved.^r^rGenerator file with guide for 960.gs.</about>
<category>aaaThisPutsMeAtTheTopOfTheMenu</category>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

*/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

//=================================================================
// Globals
//=================================================================

// UI strings to be localized
var strAlertSpecifyTotalWidth = localize("$$$/JavaScripts/GridTemplateGenerator/SpecifyTotalWidth=Please specify total width.");
var strAlertSpecifyGutterWidth = localize("$$$/JavaScripts/GridTemplateGenerator/SpecifyGutterWidth=Please specify gutter width.");
var strAlertSpecifyTotalColumn = localize("$$$/JavaScripts/GridTemplateGenerator/SpecifyTotalColumn=Please specify total column.");
var strAlertSpecifyTotalHeight = localize("$$$/JavaScripts/GridTemplateGenerator/SpecifyTotalHeight=Total height value not less than 200.");
var strAlertTotalWidthLessThanTotalColumn = localize("$$$/JavaScripts/GridTemplateGenerator/TotalWidthLessThanTotalColumn=Value of total width less than total column.");
var strAlertNotNullTotalWidth = localize("$$$/JavaScripts/GridTemplateGenerator/NotNullTotalWidth=Value of total width is not equal zero.");
var strAlertNotNullTotalColumn = localize("$$$/JavaScripts/GridTemplateGenerator/NotNullTotalColumn=Value of total column is not equal zero.");
var strTextCopyrightJunzeCOM = localize("$$$/JavaScripts/GridTemplateGenerator/TextCopyrightJunzeCOM=(c) 2010-2015x. i-designer.net");
var strTitle = localize("$$$/JavaScripts/GridTemplateGenerator/Title=Grid Template Generator");
var strButtonRun = localize("$$$/JavaScripts/GridTemplateGenerator/Run=Create");
var strButtonCancel = localize("$$$/JavaScripts/GridTemplateGenerator/Cancel=Cancel");
var strLabelTotalWidth = localize("$$$/JavaScripts/GridTemplateGenerator/TotalWidth=Total width(px):");
var strLabelGutterWidth = localize("$$$/JavaScripts/GridTemplateGenerator/GutterWidth=Gutter width(px):");
var strLabelTotalColumn = localize("$$$/JavaScripts/GridTemplateGenerator/TotalColumn=Total column:");
var strLabelTotalHeight = localize("$$$/JavaScripts/GridTemplateGenerator/TotalHeight=Total height(Not less than 200px):");
var strLabelDocumentType = localize("$$$/JavaScripts/GridTemplateGenerator/DocumentType=Background Contents:");
var	stretTotalWidth = localize( "$$$/locale_specific/JavaScripts/GridTemplateGenerator/ETTotalWidthLength=950" );
var	stretGutterWidth = localize( "$$$/locale_specific/JavaScripts/GridTemplateGenerator/ETGutterWidthLength=7" );
var	stretTotalColumn = localize( "$$$/locale_specific/JavaScripts/GridTemplateGenerator/ETTotalColumnLength=33" );
var	stretTotalHeight = localize( "$$$/locale_specific/JavaScripts/GridTemplateGenerator/ETTotalHeightLength=1700" );
var	strddDocumentType = localize( "$$$/locale_specific/JavaScripts/GridTemplateGenerator/DDDocumentType=100" );

// ok and cancel button
var runButtonID = 1;
var cancelButtonID = 2;

var whiteIndex = 0;
var backgroundColorIndex = 1;
var transparentIndex = 2;

///////////////////////////////////////////////////////////////////////////////
// Dispatch
///////////////////////////////////////////////////////////////////////////////


main();



///////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// Function: main
// Usage: the core routine for this script
// Input: <none>
// Return: <none>
///////////////////////////////////////////////////////////////////////////////
function main() {
    
    var generatorObj = new Object();    
    initGeneratorObj(generatorObj);
     	    
    if ( DialogModes.ALL == app.playbackDisplayDialogs ) {
    	if (cancelButtonID == settingDialog(generatorObj)) {
	    	return 'cancel'; // quit, returning 'cancel' (dont localize) makes the actions palette not record our script
	    }
	}
	
	gridGeneratorTemplate(generatorObj);
    
}


///////////////////////////////////////////////////////////////////////////////
// Function: settingDialog
// Usage: pop the ui and get user settings
// Input: generatorObj object containing our parameters
// Return: on ok, the dialog info is set to the generatorObj object
///////////////////////////////////////////////////////////////////////////////
function settingDialog(generatorObj)
{
    dlgMain = new Window("dialog", strTitle);
    
    // match our dialog background color to the host application
	//var brush = dlgMain.graphics.newBrush(dlgMain.graphics.BrushType.THEME_COLOR, "appDialogBackground");
    //dlgMain.graphics.backgroundColor = brush;
    //dlgMain.graphics.disabledBackgroundColor = brush;

	dlgMain.orientation = 'column';
	dlgMain.alignChildren = 'left';	

	// -- two groups, one for left and one for right ok, cancel
	dlgMain.grpTop = dlgMain.add("group");
	dlgMain.grpTop.orientation = 'column';
	dlgMain.grpTop.alignChildren = 'left';
	dlgMain.grpTop.alignment = 'fill';
	
	// -- two groups, one for left and one for right ok, cancel
	dlgMain.grpButton = dlgMain.add("group");
	dlgMain.grpButton.orientation = 'row';
	dlgMain.grpButton.alignChildren = 'center';
	dlgMain.grpButton.alignment = 'fill';
	
	dlgMain.pnlCreateOption = dlgMain.add("panel", undefined, "Options");
	dlgMain.pnlCreateOption.alignChildren = 'left';
	dlgMain.pnlCreateOption.alignment = 'fill';
	
	dlgMain.grpBottom = dlgMain.add("group");
	dlgMain.grpBottom.orientation = 'column';
	dlgMain.grpBottom.alignChildren = 'center';
	dlgMain.grpBottom.alignment = 'fill';		

	// -- the third line in the dialog
    dlgMain.grpTop.add("statictext", undefined, strLabelTotalWidth);
	// -- the fourth line in the dialog
    dlgMain.etTotalWidth = dlgMain.grpTop.add("edittext", undefined, generatorObj.totalWidth.toString());
    dlgMain.etTotalWidth.alignment = 'fill';
    dlgMain.etTotalWidth.preferredSize.width = StrToIntWithDefault( strLabelTotalWidth, 160 );
	
	// -- the third line in the dialog
    dlgMain.grpTop.add("statictext", undefined, strLabelGutterWidth);
	// -- the fourth line in the dialog
    dlgMain.etGutterWidth = dlgMain.grpTop.add("edittext", undefined, generatorObj.gutterWidth.toString());
    dlgMain.etGutterWidth.alignment = 'fill';
    dlgMain.etGutterWidth.preferredSize.width = StrToIntWithDefault( strLabelGutterWidth, 160 );
	
	// -- the third line in the dialog
    dlgMain.grpTop.add("statictext", undefined, strLabelTotalColumn);
	// -- the fourth line in the dialog
    dlgMain.etTotalColumn = dlgMain.grpTop.add("edittext", undefined, generatorObj.totalColumn.toString());
    dlgMain.etTotalColumn.alignment = 'fill';
    dlgMain.etTotalColumn.preferredSize.width = StrToIntWithDefault( strLabelTotalColumn, 160 );

	// -- the third line in the dialog
    dlgMain.pnlCreateOption.add("statictext", undefined, strLabelTotalHeight);
	// -- the fourth line in the dialog
    dlgMain.etTotalHeight = dlgMain.pnlCreateOption.add("edittext", undefined, generatorObj.totalHeight.toString());
    dlgMain.etTotalHeight.alignment = 'fill';
    dlgMain.etTotalHeight.preferredSize.width = StrToIntWithDefault( strLabelTotalHeight, 160 );
	
	// -- the third line in the dialog
    dlgMain.pnlCreateOption.add("statictext", undefined, strLabelDocumentType);
	dlgMain.ddDocumentType = dlgMain.pnlCreateOption.add("dropdownlist", undefined);
    dlgMain.ddDocumentType.preferredSize.width = StrToIntWithDefault( strddDocumentType, 100 );
    dlgMain.ddDocumentType.alignment = 'left';
    dlgMain.ddDocumentType.add("item", "White");
    dlgMain.ddDocumentType.add("item", "Background color");
    dlgMain.ddDocumentType.add("item", "Transparent");
	dlgMain.ddDocumentType.items[generatorObj.documentType].selected = true;

	dlgMain.btnRun = dlgMain.grpButton.add("button", undefined, strButtonRun );
    dlgMain.btnRun.onClick = function() {
		var totalWidth = dlgMain.etTotalWidth.text;
		if (totalWidth.length == 0) {
	        alert(strAlertSpecifyTotalWidth);
			return;
		}
		if (Math.abs(parseInt(totalWidth)) == 0) {
	        alert(strAlertNotNullTotalWidth);
			return;
		}
		
		var gutterWidth = dlgMain.etGutterWidth.text;
		if (gutterWidth.length == 0) {
	        alert(strAlertSpecifyGutterWidth);
			return;
		}
		
		var totalColumn = dlgMain.etTotalColumn.text;
		if (totalColumn.length == 0) {
	        alert(strAlertSpecifyTotalColumn);
			return;
		}
		if (Math.abs(parseInt(totalColumn)) == 0) {
	        alert(strAlertNotNullTotalColumn);
			return;
		}
		
		if ( Math.abs(parseInt(totalWidth)) < Math.abs(parseInt(totalColumn)) ) {
	        alert(strAlertTotalWidthLessThanTotalColumn);
			return;
		}
		
		var totalHeight = dlgMain.etTotalHeight.text;		
		if (Math.abs(parseInt(totalHeight)) < 200) {
	        alert(strAlertSpecifyTotalHeight);
			return;
		}
		
		dlgMain.close(runButtonID);
	}

	dlgMain.btnCancel = dlgMain.grpButton.add("button", undefined, strButtonCancel );
    dlgMain.btnCancel.onClick = function() { 
		dlgMain.close(cancelButtonID); 
	}
	
	dlgMain.grpBottom.add("statictext", undefined, strTextCopyrightJunzeCOM);
	
	dlgMain.defaultElement = dlgMain.btnRun;
	dlgMain.cancelElement = dlgMain.btnCancel;
    
	app.bringToFront();
	
	dlgMain.center();
    var result = dlgMain.show();
    
    if (cancelButtonID == result) {
		return result;  // close to quit
	}
    
    // get setting from dialog
    generatorObj.totalWidth = Math.abs(parseInt(dlgMain.etTotalWidth.text));
	generatorObj.gutterWidth = Math.abs(parseInt(dlgMain.etGutterWidth.text));
	generatorObj.totalColumn = Math.abs(parseInt(dlgMain.etTotalColumn.text));
	generatorObj.totalHeight = Math.abs(parseInt(dlgMain.etTotalHeight.text));
	
	generatorObj.documentType = dlgMain.ddDocumentType.selection.index;

    return result;
}

///////////////////////////////////////////////////////////////////////////////
// Function: initGeneratorObj
// Usage: create our default parameters
// Input: a new Object
// Return: a new object with params set to default
///////////////////////////////////////////////////////////////////////////////
function initGeneratorObj(generatorObj)
{
    generatorObj.totalWidth = 960;
	generatorObj.gutterWidth = 20;
	generatorObj.totalColumn = 12;
	generatorObj.totalHeight = 1700;
	generatorObj.documentType = whiteIndex;
}

///////////////////////////////////////////////////////////////////////////////
// Function: gridGeneratorTemplate
// Usage: create our default parameters
// Input: a new Object
// Return: a new object with params set to default
///////////////////////////////////////////////////////////////////////////////
function gridGeneratorTemplate(generatorObj)
{
    //alert(generatorObj.totalWidth + ' - ' + generatorObj.gutterWidth + ' - ' + generatorObj.totalColumn);
	var w2 = generatorObj.gutterWidth;
	var w1 = generatorObj.totalWidth - w2;
	var c = generatorObj.totalColumn;
	var h = generatorObj.totalHeight;
	var dt = generatorObj.documentType;
	var w_grid = (w1-(c-1)*w2)/c;
	var w3 = w_grid+w2;
	
	if ( ( h == 0 ) || ( !h) ) h=Math.abs(parseInt(stretTotalHeight));
	
	var strtRulerUnits = app.preferences.rulerUnits;
	var strtTypeUnits = app.preferences.typeUnits;
	app.preferences.rulerUnits = Units.PIXELS;
	app.preferences.typeUnits = TypeUnits.POINTS;

	if ( dt == whiteIndex ) {
		var newDocumentRef = app.documents.add(w1+200, h, 72.0, "Grid Template " + w1 + "-" + w2 + "-" + c, NewDocumentMode.RGB,DocumentFill.WHITE);
	}
	if ( dt == backgroundColorIndex ) {
		var newDocumentRef = app.documents.add(w1+200, h, 72.0, "Grid Template " + w1 + "-" + w2 + "-" + c, NewDocumentMode.RGB,DocumentFill.BACKGROUNDCOLOR);
	}
	if ( dt == transparentIndex ) {
		var newDocumentRef = app.documents.add(w1+200, h, 72.0, "Grid Template " + w1 + "-" + w2 + "-" + c, NewDocumentMode.RGB,DocumentFill.TRANSPARENT);
	}

	//Add text
	var textColor = new SolidColor;
	textColor.rgb.red = 0;
	textColor.rgb.green = 0;
	textColor.rgb.blue = 0;

	var newTextLayer = newDocumentRef.artLayers.add();
	newTextLayer.kind = LayerKind.TEXT;	
	//newTextLayer.textItem.position = Array((w1/2 - newTextLayer.textItem.width/2), (h-100));		
	newTextLayer.textItem.justification = Justification.CENTERJUSTIFIED;
	newTextLayer.textItem.size = 12;
	newTextLayer.textItem.font = "Arial";
	newTextLayer.textItem.color = textColor;
	newTextLayer.textItem.antiAliasMethod = AntiAlias.NONE;
	newTextLayer.textItem.contents = "Full width: " + (w1 + w2) + ", Content width: " + w1 + ", Column width: " + w_grid + " Number of columns: " + c + ", Gutter width: " + w2 + ". Generator By Gridgenerator. " + strTextCopyrightJunzeCOM;
	//Now change the text layer type to paragraph so you can determine the width of the text
	newTextLayer.textItem.kind = TextType.PARAGRAPHTEXT;
	newTextLayer.textItem.width = w1;
	newTextLayer.textItem.position = Array(100,20);
	
	app.preferences.rulerUnits = strtRulerUnits;
	app.preferences.typeUnits = strtTypeUnits;
	newDocumentRef = null;
	textColor = null;
	newTextLayer = null;	
	
	//Add guide
	guideLine(100, 'Vrtc');
	guideLine(100+(w2/2), 'Vrtc');
	var j = 100+(w2/2);
	for(i=0;i<c-1;i++)
	{		
		j += w_grid;
		guideLine(j, 'Vrtc');
		j += w2;
		guideLine(j, 'Vrtc');
	}
	guideLine(w1+100, 'Vrtc');
	guideLine(w1+100+(w2/2), 'Vrtc');
	
	j = 50;
	for(i=0;i<((h-100)/w2);i++)
	{
		j += w2;
		guideLine(j, 'Hrzn');
	}

}

///////////////////////////////////////////////////////////////////////////
// Function: guideLine
// Usage: make guideline
// Input:  number and string
// Return: void
///////////////////////////////////////////////////////////////////////////
function guideLine(position, type) {
   // types: Vrtc & Hrzn
   // =======================================================
   var id296 = charIDToTypeID( "Mk  " );
       var desc50 = new ActionDescriptor();
       var id297 = charIDToTypeID( "Nw  " );
           var desc51 = new ActionDescriptor();
           var id298 = charIDToTypeID( "Pstn" );
           var id299 = charIDToTypeID( "#Pxl" );
           desc51.putUnitDouble( id298, id299, position );
           var id300 = charIDToTypeID( "Ornt" );
           var id301 = charIDToTypeID( "Ornt" );
           var id302 = charIDToTypeID( type );
         desc51.putEnumerated( id300, id301, id302 );
          var id303 = charIDToTypeID( "Gd  " );
       desc50.putObject( id297, id303, desc51 );
   executeAction( id296, desc50, DialogModes.NO );
};

///////////////////////////////////////////////////////////////////////////////
// Function: clearGuides
// Usage: clear all guidelines
// Input: 
// Return: void
///////////////////////////////////////////////////////////////////////////////
function clearGuides() {
   // =======================================================
   var id556 = charIDToTypeID( "Dlt " );
       var desc102 = new ActionDescriptor();
       var id557 = charIDToTypeID( "null" );
           var ref70 = new ActionReference();
           var id558 = charIDToTypeID( "Gd  " );
           var id559 = charIDToTypeID( "Ordn" );
           var id560 = charIDToTypeID( "Al  " );
           ref70.putEnumerated( id558, id559, id560 );
       desc102.putReference( id557, ref70 );
   executeAction( id556, desc102, DialogModes.NO );
};

///////////////////////////////////////////////////////////////////////////
// Function: StrToIntWithDefault
// Usage: convert a string to a number, first stripping all characters
// Input: string and a default number
// Return: a number
///////////////////////////////////////////////////////////////////////////
function StrToIntWithDefault( s, n ) {
    var onlyNumbers = /[^0-9]/g;
    var t = s.replace( onlyNumbers, "" );
	t = parseInt( t );
	if ( ! isNaN( t ) ) {
        n = t;
    }
    return n;
}

// End Layer Comps To Files.jsx
