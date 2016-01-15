<?php
class TodoEntryController extends Controller {
	public function __construct(){
		parent::__construct("todoentry");
	}
	public function Map(){
		$this->Route( 'GET', '', function() {
            if(AuthRepository::Autherize()){
                $todoEntryRepository = new TodoEntryRepository;
                $voteRepository = new VoteRepository;
                $entries = $todoEntryRepository->LoadAll([
                    ["CreatorUserId" => "user"],
                    ["ProofPhotoId" => "media"]
                ]);
                $counter = 0;
                while($counter < count($entries)){
                    $votes = $voteRepository->LoadWhere("TodoEntryId = ".$entries[$counter]["Id"]);
                    $voteCounter = 0;
                    $downVoteCounter = 0;
                    $hasUserUpVoted = null;
                    foreach($votes as $vote){
                        if($vote["UpVote"] == "1"){
                            $voteCounter++;
                        } else {
                            $voteCounter;
                        }
                        if($vote["UserId"] == AuthRepository::GetUserId()){
                            $hasUserUpVoted = $vote["UpVote"] == "1";
                        }
                    }
                    $entries[$counter]["Karma"] = $voteCounter;
                    //null = not votet
                    //true = upvoted
                    //false = downvoted
                    $entries[$counter]["HasUserUpVoted"] = $hasUserUpVoted;
                    $counter++;
                }
                $this->Send($entries);
            }
		});
        $this->Route('POST', '/create',function(){
            $todoEntryRepository = new TodoEntryRepository;
            $request = $this->GetRequestData();
            if(AuthRepository::Autherize()){
                if(isset($request->Title)){
                    $callback = $todoEntryRepository->Save(array(
                        "Title" => isset($request->Title) ? $request->Title : NULL,
                        "Message" => isset($request->Message) ? $request->Message : NULL,
                        "Destination" => isset($request->Destination) ? $request->Destination : NULL,
                        "ApplicationDate" => isset($request->ApplicationDate) ? $request->ApplicationDate : NULL,
                        "MaxPersonNumber" => isset($request->MaxPersonNumber) ? $request->MaxPersonNumber : NULL,
                        "ProofPhotoRequired" =>  isset($request->ProofPhotoRequired) ? $request->ProofPhotoRequired : NULL,
                        "Public" => isset($request->Public) ? $request->Public : NULL,
                        "CreatorUserId" => AuthRepository::GetUserId(),
                        "Active" => true,
                        "Finished" => false
                    ));
                    $this->Send([
                        "Status" => $callback != 0, 
                        "Error" => $todoEntryRepository->GetQueryError(), 
                        "Record" => $todoEntryRepository->GetById($todoEntryRepository->GetLastInsertedId(), [
                                                                                        ["CreatorUserId" => "user"],
                                                                                        ["ProofPhotoId" => "photo"]
                                                                                    ])
                    ]);
                } else {
                    $this->NotFound();
                }
            }        
        });
        $this->Route('POST', '/finish', function(){
             if(AuthRepository::Autherize()){
                 if(isset($_POST["entryId"]) && isset($_FILES['file'])){
                     $media = $_FILES['file'];
                     $entryId = $_POST["entryId"];
                     
                     $todoEntryRepository = new TodoEntryRepository;
                     $mediaRepository = new MediaRepository;
                     
                     $fileExtension = $ext = end((explode(".", $media["name"])));                     
                     $uniqid = uniqid();
                     $newMediaName = $uniqid.".".$fileExtension;
                     $entry = $todoEntryRepository->LoadWhere("Id = $entryId")[0];
                     
                     $mediaRepository->Save([
                         "UploadUserId" => AuthRepository::GetUserId(),
                         "Description" => "Bewisfoti vom Bitrag \"". $entry["Title"] ."\"",
                         "Destination" => $entry["Destination"] != null ? $entry["Destination"] : null,
                         "Path" => $newMediaName
                     ]);
                     
                     
                     $todoEntryRepository->UpdateWhere("Id = $entryId", [
                         "ProofPhotoId" => $mediaRepository->GetLastInsertedId(),
                         "Finished" => true
                         ]);
                     move_uploaded_file($media['tmp_name'], 'images/gallery/'.$newMediaName);
                     
                     
                 } else {
                     $this->NotFound();
                 }
             }
        });
    }
}
?>