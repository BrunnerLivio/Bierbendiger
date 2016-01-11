<?php
class EntryOfTheDayController extends Controller {
	public function __construct(){
		parent::__construct("entryoftheday");
	}
	public function Map(){
		$this->Route( 'POST', '/create', function() {
            if(AuthRepository::Autherize()){
                $request = $this->GetRequestData();
                if(isset($request->Message)){
                    $entryOfTheDayRepository = new EntryOfTheDayRepository;
                    $entries = $entryOfTheDayRepository->Save(array(
                        "Message" => $request->Message,
                        "UserId" => AuthRepository::GetUserId()
                    ));
                    $this->Send($entries);
                } else {
                    $this->NotFound();
                }
            }
            
		});
		
	}
}
?>