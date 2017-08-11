<?php
 //start building the mail string
 include 'include.php';
 
 foreach ($_POST['form_p60_p45'] as $formP60P45){
 }
 
 foreach ($_POST['med_card'] as $medCard){
 }
  
 foreach ($_POST['rent_before'] as $rentingBefore){
 }
 
 foreach ($_POST['apply_for_refund'] as $applyForRefund){
 }

 //  Adding links to the email message to enable the admin to be able to download uploaded files
 
$fileName1=$_FILES['data_file']['name'][0];
$fileName2=$_FILES['data_file']['name'][1];
 $link1= "http://apps.ieaccounts.ie/refund/fileuploads/$fileName1";
 $link2= "http://apps.ieaccounts.ie/refund/fileuploads/$fileName2";
 
 $time = time();
 
 $msg = "Form Submitted on :  ".date("m/d/y G:i:s", $time)."\n\n";
 $msg .= "First Name:  ".$_POST['first_name']."\n\n";
 $msg .= "Last Name:  ".$_POST['last_name']."\n\n";
 $msg .= "Date of Birth:  ".$_POST['birthday']."\n\n";
 $msg .= "Telephone Number:  ".$_POST['user_tel']."\n\n";
 $msg .= "Email Address:  ".$_POST['email']."\n\n";
 $msg .= "Nationality:  ".$_POST['nationality']."\n\n";
 $msg .= "Do you have a P60/P45:  ".$formP60P45."\n\n";
 $msg .= "Do you want us to apply for your tax refund:  ".$applyForRefund."\n\n";
 $msg .= "How did you hear about us:  ".$_POST['hear_about']."\n\n";
 $msg .= "Link to employer's ID:  ".$link1."\n\n";
 $msg .= "Link to Employer's P60 or P45:  ".$link2."\n\n";
 
 
 //set up the mail
 $recipient = "info@ieaccounts.ie";
 $subject = "Form Submission Results";
 $mailheaders = "From: My Web Site <postmaster@localhost>\n";
 $mailheaders .= "Reply-To: ".$_POST['email'];

 //send the mail
mail($recipient, $subject, $msg, $mailheaders);

//upload any attached files
 
$file_dir=$_SERVER['DOCUMENT_ROOT']. "/refund/fileuploads" ;
	  

$fileName1=$_FILES['data_file']['name'][0];
$fileName2=$_FILES['data_file']['name'][1];

 for($i=0; $i<2; $i++) {
$tmpFilePath = $_FILES['data_file']['tmp_name'][$i];
$fileName=$_FILES['data_file']['name'][$i];
$fileType=$_FILES['data_file']['type'][$i];
$fileSize=$_FILES['data_file']['size'][$i]; 

 if (is_uploaded_file($tmpFilePath)) {
 move_uploaded_file($tmpFilePath,"$file_dir/".$fileName) 
 or die ("Couldn't move file");
 //echo "File was moved!";
 } else {
 //echo "No file found.";
 }
}
 
                                                                                      //Send to database
 
 //connect to database
 
doDB();

//create clean versions of input strings
$safe_f_name = mysqli_real_escape_string($mysqli, $_POST['first_name']);
$safe_l_name = mysqli_real_escape_string($mysqli, $_POST['last_name']);
$safe_date_of_b = mysqli_real_escape_string($mysqli, $_POST['birthday']);
$safe_nationality= mysqli_real_escape_string($mysqli, $_POST['nationality']);
$safe_filing_status = mysqli_real_escape_string($mysqli, $_POST['filing_status']);
$safe_tax_year= mysqli_real_escape_string($mysqli, $_POST['tax_year']);
$safe_user_tel = mysqli_real_escape_string($mysqli, $_POST['user_tel']);
$safe_email = mysqli_real_escape_string($mysqli, $_POST['email']);

$safe_total_wages = mysqli_real_escape_string($mysqli, $_POST['total_wages']);
$safe_total_tax_allow = mysqli_real_escape_string($mysqli, $_POST['total_tax_allowance']);
$safe_tax_deduct_exp = mysqli_real_escape_string($mysqli, $_POST['tax_deduc_exp']);
$safe_num_of_employers = mysqli_real_escape_string($mysqli, $_POST['num_of_employers']);

$safe_second_earner_wages = mysqli_real_escape_string($mysqli, $_POST['second_earner_wages']);
$safe_second_allowance = mysqli_real_escape_string($mysqli, $_POST['second_tax_allowance']);
$safe_tax_deduc_exp2 = mysqli_real_escape_string($mysqli, $_POST['tax_deduc_exp2']);
if ($safe_filing_status=="Married Couple/Civil Partners Two Income") {	
	     $safe_num_of_employers2 = mysqli_real_escape_string($mysqli, $_POST['num_of_employers2']);		
} else {
	     $safe_num_of_employers2 =0;
}

$safe_total_tax_paid = mysqli_real_escape_string($mysqli, $_POST['total_tax_paid']);
$safe_total_usc_paid = mysqli_real_escape_string($mysqli, $_POST['total_usc_paid']);
$safe_total_prsi_paid= mysqli_real_escape_string($mysqli, $_POST['total_prsi_paid']);



$safe_med_card = mysqli_real_escape_string($mysqli, $medCard);
$safe_deduc_med_exp = mysqli_real_escape_string($mysqli, $_POST['deduc_med_exp']);
$safe_rent_paid = mysqli_real_escape_string($mysqli, $_POST['rent_paid']);
$safe_rent = mysqli_real_escape_string($mysqli, $rentingBefore);
$safe_sch_fees_paid = mysqli_real_escape_string($mysqli, $_POST['tuition_fees_paid']);
$safe_p60_p45 = mysqli_real_escape_string($mysqli, $formP60P45);
$safe_hearabout = mysqli_real_escape_string($mysqli, $_POST['hear_about']);
$safe_payetax = mysqli_real_escape_string($mysqli, $_POST['paye_tax'] );
$safe_calusc = mysqli_real_escape_string($mysqli, $_POST['cal_usc']);
$safe_calprsi = mysqli_real_escape_string($mysqli, $_POST['cal_prsi']);
$safe_refund = mysqli_real_escape_string($mysqli, $_POST['cal_refund']);

//time to add to tables, so check for required fields

if (($_POST['first_name']== "") || ($_POST['last_name'] == "")|| ($_POST['birthday'] == "") 
     || ($_POST['user_tel'] == "") || ($_POST['email'] == "") || ($_POST['total_wages'] == "") || ($_POST['total_tax_allowance']== "") || ($_POST['total_tax_paid']== "") 
	 || ($_POST['total_usc_paid']== "") || ( $_POST['total_prsi_paid'] == "") || ($_POST['deduc_med_exp'] == "") ||($_POST['second_earner_wages']=="")
	 || ($_POST['rent_paid'] == "") || ($_POST['tuition_fees_paid']== "") || ($_POST['form_p60_p45'] == "") || ($_POST['med_card'] == "") 
	 || ($_POST['rent_before']  == "") || ($_POST['apply_for_refund']  == "") ) 
{
header("Location: taxrefund.html");
exit;
}


//add to personal_details table
$add_personal_sql = "INSERT INTO personal_details (date_added,
first_name, last_name, date_of_birth, nationality, filing_status, filing_year) VALUES
(now(), '".$safe_f_name."', '".$safe_l_name."', '".$safe_date_of_b."','".$safe_nationality."','".$safe_filing_status ."','".$safe_tax_year."' )";
$add_personal_res = mysqli_query($mysqli, $add_personal_sql)
or die(mysqli_error($mysqli));

//get master_id for use with other tables
$master_id = mysqli_insert_id($mysqli);


//add to contact_details table
$add_contact_sql = "INSERT INTO contact_details (master_id,
date_added, tel_number, email_address) VALUES
('".$master_id."', now(), 
'".$safe_user_tel ."', '".$safe_email."')";
$add_contact_res = mysqli_query($mysqli, $add_contact_sql )
or die(mysqli_error($mysqli));

			
//add to tax_input_details table
$add_input_sql = "INSERT INTO tax_input_details (master_id, date_added, total_wages, total_tax_allowance, tax_deduct_exp, 
number_of_employers, second_earner_wages, second_tax_allowance, second_tax_deduct_exp, second_number_of_employers, 
total_tax_paid, total_usc_paid, total_prsi_paid) VALUES
('".$master_id."', now(), '".$safe_total_wages."','".$safe_total_tax_allow."', '".$safe_tax_deduct_exp."','".$safe_num_of_employers."',
 '".$safe_second_earner_wages."', '".$safe_second_allowance."', '".$safe_tax_deduc_exp2."', '".$safe_num_of_employers2."', '".$safe_total_tax_paid."', 
 '".$safe_total_usc_paid."', '".$safe_total_prsi_paid."')";
$add_input_res = mysqli_query($mysqli, $add_input_sql)
or die(mysqli_error($mysqli));



//add to expenses_details table		
			
$add_expenses_sql = "INSERT INTO expenses_details (master_id, date_added, medical_card, medical_expenses,  rent_paid, renting_before_2010, school_fees_paid) VALUES
('".$master_id."',  now(), '".$safe_med_card."', '".$safe_deduc_med_exp."',  '".$safe_rent_paid."', '".$safe_rent."', '".$safe_sch_fees_paid."')";
$add_expenses_res = mysqli_query($mysqli, $add_expenses_sql)
or die(mysqli_error($mysqli));


//add to file_upload	table		

$add_upload_sql = "INSERT INTO file_upload (master_id, date_added, p60_p45, employers_id, employers_p60_p45, found_us_through) VALUES
('".$master_id."', now(),  '".$safe_p60_p45."', '".$fileName1."', '".$fileName2."', '".$safe_hearabout."')";
$add_upload_res = mysqli_query($mysqli, $add_upload_sql)
or die(mysqli_error($mysqli));



//add to calculated_result table

$add_result_sql = "INSERT INTO calculated_result (master_id, date_added, calculated_paye, calculated_usc, calculated_prsi, calculated_tax_refund) VALUES
('".$master_id."', now(), '".$safe_payetax."', '".$safe_calusc."', '".$safe_calprsi ."', '".$safe_refund."')";
$add_result_res = mysqli_query($mysqli, $add_result_sql)
or die(mysqli_error($mysqli));

mysqli_close($mysqli);
 
?>
 <!DOCTYPE html>
 <html>
 <head>
 <title>Tax Refund Application Confirmation</title>
 <link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="style.css">
 </head>
 <body>

<?php
 foreach ($_POST['apply_for_refund'] as $applyForRefund) {
 	if ($applyForRefund==="Yes") {
 		
 	$confirmMsg="<div class=\"sprint2 col-xs-10 col-sm-10 col-xs-offset-1 col-sm-offset-1\"><p>Hi <strong>" .$_POST['first_name'].",</strong><br/>\n";	
	$confirmMsg.="You have submitted your tax refund application.<br/>\n";
	$confirmMsg .="An attachment will be sent to your email.<br/>\n";
	$confirmMsg .="Please complete, sign, scan and send back to us, and we will get back to you.</p><br/>\n";
	$confirmMsg .="<a href=\"http://apps.ieaccounts.ie/refund/taxrefund.html\"><div class=\"form-group col-xs-12 col-sm-12\">
                  <button class=\"sprint1 sprint5 col-md-12 col-sm-12 col-xs-12\" name=\"back_to_form\" >Back to Form</button>
                  </div></a></div>
                  <br/>";
 	  echo $confirmMsg;
	 } else {
	 	
		  echo "<div class=\"sprint2 col-xs-10 col-sm-10 col-xs-offset-1 col-sm-offset-1\">
		           <p>Hi <strong>".$_POST['first_name'].","."</strong><br/>
		            Thank you for using our services. We are always here to help should you wish to make further inquiries. </p><br/><br/>
		            <a href=\"http://apps.ieaccounts.ie/refund/taxrefund.html\"><div class=\"form-group col-xs-12 col-sm-12\">
                   <button class=\"sprint1 sprint5 col-md-12 col-sm-12 col-xs-12\" name=\"back_to_form\" >Back to Form</button>
                   </div></a></div>" ;
		 
	 }
	  
 }
  ?>
 </body>
 </html>