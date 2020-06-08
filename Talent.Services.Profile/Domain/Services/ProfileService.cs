 using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Common.Security;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models;
using Talent.Services.Profile.Models.Profile;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }


        // public bool AddNewLanguage(AddLanguageViewModel language) 
        // {

        //UserLanguage userLanguage = new UserLanguage
        // {
        //var userLanguage = new List<UserLanguage>();
        //// Id = language.Id,
        //UserId = language.CurrentUserId,
        // Language = language.Name,
        //LanguageLevel = language.Level

        // };

        //return true;
        //}

        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            User profile = (await _userRepository.GetByIdAsync(Id));
            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);


                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                var language = profile.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                var experience = profile.Experience.Select(x => ViewModelFromExperience(x)).ToList();

                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,
                    LinkedAccounts = new LinkedAccounts { LinkedIn = profile.LinkedAccounts.LinkedIn, Github = profile.LinkedAccounts.Github },
                    Description = profile.Description,
                    FirstName = profile.FirstName,
                    MiddleName = profile.MiddleName,
                    LastName = profile.LastName,
                    Email = profile.Email,
                    Summary = profile.Summary,
                    Experience = experience,
                    Languages = language,
                    Phone = profile.Phone,
                    Gender = profile.Gender,
                    Address = new Address
                    {
                        Number = profile.Address.Number,
                        Street = profile.Address.Street,
                        Suburb = profile.Address.Suburb,
                        PostCode = profile.Address.PostCode,
                        City = profile.Address.City,
                        Country = profile.Address.Country
                    },
                    Nationality = profile.Nationality,
                    VisaStatus = profile.VisaStatus,
                    JobSeekingStatus = new JobSeekingStatus { Status = profile.JobSeekingStatus?.Status ?? null, AvailableDate = profile.JobSeekingStatus?.AvailableDate ?? null },
                    VisaExpiryDate = profile.VisaExpiryDate,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,

                };
                return result;
            }

            return null;

        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            try
            {
                if (model.Id != null)
                {

                    User existingTalent = (await _userRepository.GetByIdAsync(model.Id));
                    existingTalent.LinkedAccounts.LinkedIn = model.LinkedAccounts.LinkedIn;
                    existingTalent.LinkedAccounts.Github = model.LinkedAccounts.Github;
                    existingTalent.Description = model.Description;
                    existingTalent.Summary = model.Summary;
                    existingTalent.FirstName = model.FirstName;
                    existingTalent.MiddleName = model.MiddleName;
                    existingTalent.LastName = model.LastName;
                    existingTalent.Email = model.Email;
                    existingTalent.Phone = model.Phone;
                    existingTalent.ProfilePhoto = model.ProfilePhoto;
                    existingTalent.ProfilePhotoUrl = model.ProfilePhotoUrl;
                    existingTalent.Nationality = model.Nationality;
                    existingTalent.VisaStatus = model.VisaStatus;
                    existingTalent.VisaExpiryDate = model.VisaExpiryDate;
                    existingTalent.JobSeekingStatus = model.JobSeekingStatus;
                    existingTalent.Address.Number = model.Address.Number;
                    existingTalent.Address.Street = model.Address.Street;
                    existingTalent.Address.Suburb = model.Address.Suburb;
                    existingTalent.Address.PostCode = model.Address.PostCode;
                    existingTalent.Address.City = model.Address.City;
                    existingTalent.Address.Country = model.Address.Country;
                    existingTalent.UpdatedBy = updaterId;
                    existingTalent.UpdatedOn = DateTime.Now;

                    var newlanguage = new List<UserLanguage>();
                    foreach (var item in model.Languages)
                    {
                        UserLanguage language = existingTalent.Languages.SingleOrDefault(x => x.Id == item.Id);
                        if (language == null)
                        {
                            language = new UserLanguage
                            {
                                Id = ObjectId.GenerateNewId().ToString(),
                                UserId = model.Id,
                                IsDeleted = false
                            };
                        }
                        UpdateLanguageFromView(item, language);

                        newlanguage.Add(language);
                    }

                    existingTalent.Languages = newlanguage;


                    var newSkills = new List<UserSkill>();
                    foreach (var item in model.Skills)
                    {
                        var skill = existingTalent.Skills.SingleOrDefault(x => x.Id == item.Id);
                        if (skill == null)
                        {
                            skill = new UserSkill
                            {
                                Id = ObjectId.GenerateNewId().ToString(),
                                UserId = model.Id,
                                IsDeleted = false
                            };
                        }
                        UpdateSkillFromView(item, skill);
                        newSkills.Add(skill);
                    }
                    existingTalent.Skills = newSkills;

                    var newExperiences = new List<UserExperience>();
                    foreach (var item in model.Experience)
                    {
                        var experience = existingTalent.Experience.SingleOrDefault(x => x.Id == item.Id);
                        if (experience == null)
                        {
                            experience = new UserExperience
                            {
                                Id = ObjectId.GenerateNewId().ToString(),

                            };
                        }
                        UpdateExperienceFromView(item, experience);
                        newExperiences.Add(experience);
                    }
                    existingTalent.Experience = newExperiences;

                    await _userRepository.Update(existingTalent);
                }

                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file.FileName, file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _userRepository.Get(x => x.Id == talentId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file.FileName, file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _userRepository.Update(profile);
                return true;
            }

            return false;

        }


        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            try
            { 
                 var profile = await _employerRepository.GetByIdAsync(employerOrJobId);
                //var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                List<User> talentList = _userRepository.Collection.Select(x => new User() { 
                                        Id = x.Id, 
                                        FirstName = x.FirstName, 
                                        ProfilePhotoUrl = x.ProfilePhotoUrl, 
                                        VisaStatus = x.VisaStatus,
                                        //Level = x.Level,
                                        Skills = x.Skills, 
                                        Summary = x.Summary 
                                        }).Take(increment).Skip(position).ToList();
                var result = new List<TalentSnapshotViewModel>();
                if (profile != null)
                {
                     //var result = new List<TalentSnapshotViewModel>();
  
                     foreach (var item in talentList)
                     {
                         var newItem = new TalentSnapshotViewModel();

                         newItem.Id = item.Id;
                         newItem.Name = item.FirstName;  
                         newItem.Visa = item.VisaStatus;
                         newItem.Skills = new List<string>() { "item.Skills" };
                         //newItem.Level = new List<string>() { item.Level };
                         newItem.PhotoId = item.ProfilePhotoUrl;
                         newItem.Summary = item.Summary;
             
                           result.Add(newItem);
                     }
                     return result;
                }
                return null;
            }
            catch (Exception e)
            {
                  return null;
            }
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //try
            //{
               // var profile = (await _userRepository.GetByIdAsync(ids));
               // User talentList = (await _userRepository.GetByIdAsync(ids));
                ////if (profile != null)
                //{
                   // var result = new List<TalentSnapshotViewModel>();

                    //foreach (var item in talentList)
                  //  {
                      //  var newItem = new TalentSnapshotViewModel();
                       // newItem.Id = talentList.Id;
                      //  newItem.Name = talentList.FirstName;
                      ////  newItem.Visa = talentList.VisaStatus;
                      //  newItem.Skills = new List<string> { "talentList.Skills" };
                       // newItem.PhotoId = talentList.ProfilePhotoUrl;
                       // newItem.Summary = talentList.Summary;

                        //result.Add(newItem);
                   // }
                   // return result;
               // }
               // return null;
            //}
           // catch (Exception e)
           // {
                //return null;
           // }
            throw new NotImplementedException();
            //try
            //{
            //  var profile = await _employerRepository.GetByIdAsync(employerId);
            // var talentList = _userRepository.Collection.Skip(position).Take(increment).AsEnumerable();
            // if (profile != null)
            //{
            //var result = new List<TalentSnapshotViewModel>();

            //  foreach (var item in talentList)
            // {
            // var newItem = new TalentSnapshotViewModel();
            // newItem.Id = item.Id;
            // more lines assigning data
            // result.Add(newItem);
            // }
            //return result;
            ////}
            //return null;
            // }
            //catch (Exception e)
            //{
            //return null;
            //}
            //Your code here;
            //throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View


        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        protected void UpdateLanguageFromView(AddLanguageViewModel model, UserLanguage original)
        {
            original.LanguageLevel = model.Level;
            original.Language = model.Name;
        }
        protected void UpdateExperienceFromView(ExperienceViewModel model, UserExperience original)
        {
            original.Company = model.Company;
            original.Position = model.Position;
            original.Responsibilities = model.Responsibilities;
            original.Start = model.Start;
            original.End = model.End;
        }


        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }
        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {
            return new AddLanguageViewModel
            {
                Id = language.Id,
                Level = language.LanguageLevel,
                Name = language.Language
            };
        }
        protected ExperienceViewModel ViewModelFromExperience(UserExperience experience)
        {
            return new ExperienceViewModel
            {
                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End
            };
        }
        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
