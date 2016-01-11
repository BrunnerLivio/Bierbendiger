<?php
class PublicController extends Controller {
	public function __construct(){
		parent::__construct("public");
	}
	public function Map(){
		$this->Route( 'GET', '/todoentry', function() {
            $todoEntryRepository = new TodoEntryRepository;
            $entries = $todoEntryRepository->LoadWhere("Public = 1", [["CreatorUserId" => "user"]]);
            $this->Send($entries);
		});
        $this->Route( 'GET', '/entryoftheday', function() {
            $entryOfTheDayRepository = new EntryOfTheDayRepository;
            $entries = $entryOfTheDayRepository->LoadOrderBy("RAND() LIMIT 1", [["UserId" => "user"]]);
            $entry = $entries[0];
            $this->Send($entry);
		});
		$this->Route('GET', '/user-count', function(){
            $userRepository = new UserRepository;
            $number = count($userRepository->LoadAll());
            $this->Send(array("amount"=> $number));
        });
	}
}
?>