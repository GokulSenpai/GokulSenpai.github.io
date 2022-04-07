jQuery(document).ready(function($) {

(function() {
        var hidden = "hidden";
        var oldtitle = document.title;
        var currenttitle;

        var messages = ["I Miss You ❤", "Please come back! 🔙", "Don't you like me anymore? 🙂", "Fancy a cookie? 🍪", "I'm feeling lonely 😔"];

        // Standards based on browsers:
        if (hidden in document)
            document.addEventListener("visibilitychange", onchange);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onchange);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onchange);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
        else if ("onfocusin" in document)
            document.onfocusin = document.onfocusout = onchange;
        // All others:
        else
            window.onpageshow = window.onpagehide
                = window.onfocus = window.onblur = onchange;

       //if tab change happens set status to either hidden or visible
        function onchange (evt) {
            var v = "visible", h = "hidden",
                evtMap = {   //check events and set status based on event type
                    focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
                };

            evt = evt || window.event;
            if (evt.type in evtMap) {  // check the title
                currenttitle = oldtitle;
                $(document).attr('title', currenttitle);
            }
            else { // We are in hidden state so create unique title
                currenttitle = this[hidden] ? Pick_Random_Value(messages) : oldtitle; //update to whatever you want
                $(document).attr('title', currenttitle);
            }
        }

        function Pick_Random_Value(IN_Array) {
    if(IN_Array != undefined && IN_Array.length > 0)
    {
        var Copy_IN_Array = JSON.parse(JSON.stringify(IN_Array));
        if((typeof window.Last_Pick_Random_Index !== 'undefined') && (window.Last_Pick_Random_Index !== false))
        {
            if(Copy_IN_Array[Last_Pick_Random_Index] != undefined)
            {
                Copy_IN_Array.splice(Last_Pick_Random_Index,1);
            }
        }

        var Return_Value = false;

        if(Copy_IN_Array.length > 0)
        {
            var Random_Key = Math.floor(Math.random() * Copy_IN_Array.length);
            Return_Value = Copy_IN_Array[Random_Key];
        }
        else
        {
            Return_Value = IN_Array[Last_Pick_Random_Index];
        }

        window.Last_Pick_Random_Index = IN_Array.indexOf(Return_Value);
        if(window.Last_Pick_Random_Index === -1)
        {
            for (var i = 0; i < IN_Array.length; i++)
            {
                if (JSON.stringify(IN_Array[i]) === JSON.stringify(Return_Value))
                {
                    window.Last_Pick_Random_Index = i;
                    break;
                }
            }
        }
        return Return_Value;
    }
    else
    {
        return false;
    }
}

        // set the initial state (but only if browser supports the Page Visibility API)
        if( document[hidden] !== undefined )
            onchange({type: document[hidden] ? "blur" : "focus"});
    })();
});
