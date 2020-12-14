let mainURL = 'https://script.googleusercontent.com/macros/echo?user_content_key=TlCW7X1ivoLkvLx_1QOcTFeVpXXx4rQM23H3Rg5lyBwGmTbpZ_gqlC1fBr4QDzNu4zJF4Xfvc0TdqlJV5NcctrhJ6A_3K5Rwm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC09Nb0QZ6ca_LU0vmo6mSiQ7SyFG3CgdL9-1Vgcha-TAYaAGhh-9xNG-9rMNEZHQRElvdDletx0&lib=MlJcTt87ug5f_XmzO-tnIbN3yFe7Nfhi6';
let mainJSON = null;

/**
 * This slots map is to map selected course with time slots available
 */
var slots = new Map();

/**
 * This dateTime map is to map selected date with time slots available
 */     
var dateTime = new Map();
/**
 * This function map slots with the course name and create dropdown to select course
 * Then it fills the date dropdown with appropriate course name 
 */
function init(){
    $.getJSON(mainURL,function(data){
        mainJSON = data;
        data.forEach((f=data, index) => {
            slots.set(data[index].course_name,data[index].slots);
        });
        let course_dropdown = $('.course-dropdown');
        for ( const [key,value] of slots.entries() ){
            let option = $( '<option/>',{
                text: key
            });
            course_dropdown.append(option);
        }    
    }); 
}


/**
 * This function will be called when course is selected
 * and showdate function with selected courseName as parameter will be called 
 */
function selectedcourse() {
    var subjectIdNode = document.getElementById('f');
    var courseName =
    subjectIdNode.options[subjectIdNode.selectedIndex].text;
    showdate( courseName );
}

/**
 * This function fills up date dropdown based on course selected
 * 
 * When user selects course in course dropdown then this function is called with that coursename
 * This function firts clears the date dropdown
 * Then it fills the date dropdown with appropriate dates for this course
 * @param {*} courseName 
 */
function showdate( courseName ){
    var allSlots = slots.get(courseName);
    let date_dropdown = $('.date-dropdown');
    date_dropdown.empty();
    dateTime.clear();
    allSlots.forEach((f=allSlots, index) => {
        var ts = Math.round(new Date().getTime() / 1000);
        var mintime = ts + (4 * 3600);
        var maxtime = ts + (7 * 24 * 60 * 60 * 1000);
        //if( allSlots[index].slot < mintime*1000 || allSlots[index].slot > maxtime*1000) { return true; }
        const milliseconds  = parseInt( allSlots[index].slot );
        const dateObject = new Date(milliseconds)
        var key=dateObject.toLocaleDateString()
        let option = $( '<option/>',{
            text: key
        });
        if(!dateTime.has(key)){
        date_dropdown.append(option);
        dateTime.set(key, []);
        }
        dateTime.get(key).push(dateObject.toLocaleTimeString());

    });
}

 
/**
 * This function will be called when date is selected
 * and showtime function with selected date as parameter will be called 
 */
function selecteddate() {
    var subjectIdNode = document.getElementById('d');
    var date =
    subjectIdNode.options[subjectIdNode.selectedIndex].text;
    showtime( date );
}

/**
 * This function fills up time dropdown based on date selected
 * 
 * When user selects date in date dropdown then this function is called with that date
 * This function firts clears the time dropdown
 * Then it fills the date dropdown with appropriate dates for this course
 * @param {*} date 
 */
 function showtime( date ){
     var allSlots = dateTime.get(date);
     let time_dropdown = $('.time-dropdown');
     time_dropdown.empty();
     allSlots.forEach((f=allSlots, index) => {
        var key= allSlots[index]
         let option = $( '<option/>',{
             text: key
         });
         time_dropdown.append(option);
     });
 }



/**
 * This function will be called when time is selected
 * and this function alert the time slot selected so that user can confirm about selected slot
 */
function selectedtime() {
    var subjectIdNode = document.getElementById('t');
    var time =
    subjectIdNode.options[subjectIdNode.selectedIndex].text;
    alert( "you selected trial of " + document.getElementById('f').value+" on " +document.getElementById('d').value+" at "+ document.getElementById('t').value);
}




window.onload = init;
